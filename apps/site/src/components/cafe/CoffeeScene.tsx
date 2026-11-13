"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { C, ROASTS, type Roast } from "./palette";

/**
 * Baan Kafae 3D hero, shown inside a frame: a gooseneck kettle pours a stream of coffee that
 * leaves through the bottom of the frame; CoffeeRiver carries it on down the page as you scroll.
 * - the kettle follows the pointer; the stream's bottom stays centred to meet the river
 * - click: an extra "shot" (thicker pour) and the floating beans burst out and spring back
 * - the roast picker on the page changes the coffee colour (light / medium / dark)
 * Same handmade look as the studio rose: toon ramp + ink hull outlines.
 */

const INK = C.ink;
const STREAM_TOP = 1.7; // the kettle's spout tip
const STREAM_BOTTOM = -3.4; // below the frame: the page's coffee river carries on from here
const STREAM_LEN = STREAM_TOP - STREAM_BOTTOM;

type Shared = {
  time: { value: number };
  bend: { value: number };
  thick: { value: number };
  coffee: { value: THREE.Color };
  highlight: { value: THREE.Color };
};

function useToonRamp() {
  return useMemo(() => {
    const tex = new THREE.DataTexture(new Uint8Array([110, 190, 255]), 3, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ---------- the pour ---------- */

const streamVertex = /* glsl */ `
  uniform float uTime, uBend, uThick, uOutline, uLen;
  varying vec3 vN;
  varying float vT;
  void main() {
    vec3 p = position;
    float t = clamp((uLen * 0.5 - p.y) / uLen, 0.0, 1.0); // 0 at the spout, 1 at the cup
    vT = t;
    // falling coffee narrows, and pulses a little as it flows
    float r = mix(1.0, 0.62, t) * (1.0 + 0.09 * sin(p.y * 13.0 + uTime * 16.0)) * uThick;
    p.xz *= r * (1.0 + uOutline);
    // curve from the pointer-driven spout down to the cup, with a gentle wobble
    // the bottom stays centred so it lines up with the river drawn on the page below the frame
    p.x += uBend * (1.0 - sqrt(t)) + sin(p.y * 5.0 + uTime * 7.0) * 0.05 * t * (1.0 - t) * 4.0;
    vN = normalize(normalMatrix * vec3(normal.x, 0.0, normal.z));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const streamFragment = /* glsl */ `
  uniform float uTime, uOutline;
  uniform vec3 uCoffee, uHighlight, uInk;
  varying vec3 vN;
  varying float vT;
  void main() {
    if (uOutline > 0.0) { gl_FragColor = vec4(uInk, 1.0); return; }
    float l = dot(normalize(vN), normalize(vec3(0.6, 0.3, 0.75)));
    vec3 col = uCoffee * (l > 0.1 ? 1.0 : 0.72);
    // glossy streak on the lit side, broken into dashes that run downward
    float dash = step(0.35, fract(vT * 7.0 - uTime * 2.6));
    if (l > 0.62) col = mix(col, uHighlight, dash);
    if (l > 0.9) col = mix(uHighlight, vec3(1.0, 0.95, 0.88), 0.35);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Stream({ u }: { u: Shared }) {
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.11, 0.11, STREAM_LEN, 16, 90, true), []);
  const [fill, line] = useMemo(() => {
    const make = (outline: number) =>
      new THREE.ShaderMaterial({
        vertexShader: streamVertex,
        fragmentShader: streamFragment,
        side: outline ? THREE.BackSide : THREE.FrontSide,
        uniforms: {
          uTime: u.time,
          uBend: u.bend,
          uThick: u.thick,
          uCoffee: u.coffee,
          uHighlight: u.highlight,
          uOutline: { value: outline },
          uLen: { value: STREAM_LEN },
          uInk: { value: new THREE.Color(INK) },
        },
      });
    return [make(0), make(0.32)];
  }, [u]);
  const y = STREAM_BOTTOM + STREAM_LEN / 2;
  return (
    <group position={[0, y, 0]}>
      <mesh geometry={geometry} material={line} />
      <mesh geometry={geometry} material={fill} />
    </group>
  );
}

/* ---------- floating beans ---------- */

const BEANS = 12;

function Beans({ burst, ramp }: { burst: React.MutableRefObject<number>; ramp: THREE.Texture }) {
  const body = useRef<THREE.InstancedMesh>(null);
  const hull = useRef<THREE.InstancedMesh>(null);
  const crease = useRef<THREE.InstancedMesh>(null);
  const beans = useMemo(
    () =>
      Array.from({ length: BEANS }, (_, i) => ({
        a: (i / BEANS) * Math.PI * 2 + Math.random() * 0.3,
        r: 1.75 + Math.random() * 0.7,
        h: -0.9 + Math.random() * 2.9,
        speed: 0.12 + Math.random() * 0.1,
        spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(1.4),
        off: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        size: 0.85 + Math.random() * 0.4,
      })),
    [],
  );
  const geo = useMemo(() => new THREE.SphereGeometry(1, 18, 14).scale(0.17, 0.12, 0.095), []);
  const hullGeo = useMemo(() => new THREE.SphereGeometry(1, 18, 14).scale(0.195, 0.145, 0.118), []);
  const creaseGeo = useMemo(() => new THREE.BoxGeometry(0.25, 0.022, 0.03).translate(0, 0, 0.088), []);
  const lastBurst = useRef(0);
  const m = useMemo(() => new THREE.Matrix4(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const e = useMemo(() => new THREE.Euler(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const s = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    dt = Math.min(dt, 1 / 30);
    const t = state.clock.elapsedTime;
    // a fresh click kicks every bean outward
    if (burst.current > 0.95 && lastBurst.current <= 0.95) {
      beans.forEach((b) => {
        const dir = new THREE.Vector3(Math.cos(b.a), 0.6 + Math.random(), Math.sin(b.a) * 0.6).normalize();
        b.vel.addScaledVector(dir, 3.5 + Math.random() * 2.5);
      });
    }
    lastBurst.current = burst.current;
    beans.forEach((b, i) => {
      // spring the burst offset back home
      b.vel.addScaledVector(b.off, -14 * dt).multiplyScalar(1 - 3.2 * dt);
      b.off.addScaledVector(b.vel, dt);
      const a = b.a + t * b.speed;
      pos.set(Math.cos(a) * b.r, b.h + Math.sin(t * 1.3 + i) * 0.14, Math.sin(a) * b.r * 0.55).add(b.off);
      e.set(t * b.spin.x + i, t * b.spin.y, t * b.spin.z);
      q.setFromEuler(e);
      s.setScalar(b.size);
      m.compose(pos, q, s);
      body.current?.setMatrixAt(i, m);
      hull.current?.setMatrixAt(i, m);
      crease.current?.setMatrixAt(i, m);
    });
    [body, hull, crease].forEach((r) => r.current && (r.current.instanceMatrix.needsUpdate = true));
  });

  return (
    <>
      <instancedMesh ref={hull} args={[hullGeo, undefined, BEANS]} frustumCulled={false}>
        <meshBasicMaterial color={INK} side={THREE.BackSide} />
      </instancedMesh>
      <instancedMesh ref={body} args={[geo, undefined, BEANS]} frustumCulled={false}>
        <meshToonMaterial color="#5a3420" gradientMap={ramp} />
      </instancedMesh>
      <instancedMesh ref={crease} args={[creaseGeo, undefined, BEANS]} frustumCulled={false}>
        <meshBasicMaterial color={INK} />
      </instancedMesh>
    </>
  );
}

/* ---------- gooseneck kettle that pours (follows the pointer) ---------- */

function Kettle({ u, ramp }: { u: Shared; ramp: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);
  const ink = useMemo(() => new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide }), []);
  const body = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * Math.PI; // bottom -> top, a squat rounded pot
      pts.push(new THREE.Vector2(Math.sin(a) * 0.42 * (a > Math.PI * 0.75 ? 0.85 : 1), -Math.cos(a) * 0.3));
    }
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  // spout tip sits at the group's origin, which is the top of the stream
  const spout = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.62, 0.3, 0),
      new THREE.Vector3(0.36, 0.38, 0),
      new THREE.Vector3(0.14, 0.42, 0),
      new THREE.Vector3(0.02, 0.24, 0),
      new THREE.Vector3(0, 0.02, 0),
    ]);
    return {
      fill: new THREE.TubeGeometry(curve, 40, 0.042, 10, false),
      line: new THREE.TubeGeometry(curve, 40, 0.075, 10, false),
    };
  }, []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    g.position.x = u.bend.value;
    // a little extra tilt while a "shot" is pouring
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, 0.08 + (u.thick.value - 1) * 0.35, 6, dt);
    g.position.y = STREAM_TOP + Math.sin(state.clock.elapsedTime * 1.6) * 0.015;
  });

  return (
    <group ref={group} position={[0, STREAM_TOP, 0]} scale={0.9}>
      <mesh geometry={spout.line} material={ink} />
      <mesh geometry={spout.fill}>
        <meshToonMaterial color="#c8794a" gradientMap={ramp} />
      </mesh>
      <group position={[0.95, 0.42, 0]} rotation={[0, 0, 0.32]}>
        <mesh geometry={body} scale={1.07} material={ink} />
        <mesh geometry={body}>
          <meshToonMaterial color="#c8794a" gradientMap={ramp} side={THREE.DoubleSide} />
        </mesh>
        {/* lid + knob */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.3, 0.36, 0.06, 40]} />
          <meshToonMaterial color={C.cream} gradientMap={ramp} />
        </mesh>
        <mesh position={[0, 0.3, 0]} scale={[1.08, 1.8, 1.08]} material={ink}>
          <cylinderGeometry args={[0.3, 0.36, 0.06, 40]} />
        </mesh>
        <mesh position={[0, 0.39, 0]}>
          <sphereGeometry args={[0.07, 16, 12]} />
          <meshToonMaterial color={INK} />
        </mesh>
        {/* handle */}
        <group position={[0.4, 0.04, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <torusGeometry args={[0.22, 0.045, 10, 30, Math.PI]} />
            <meshToonMaterial color={INK} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ---------- scene ---------- */

function Rig({ roast, burst }: { roast: Roast; burst: React.MutableRefObject<number> }) {
  const ramp = useToonRamp();
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(0, 0.5, 0);
  }, [camera]);

  const u = useMemo<Shared>(
    () => ({
      time: { value: 0 },
      bend: { value: 0 },
      thick: { value: 1 },
      coffee: { value: new THREE.Color(ROASTS[roast].coffee) },
      highlight: { value: new THREE.Color(ROASTS[roast].highlight) },
    }),
    // colours ease toward the current roast in useFrame, so the uniforms are made once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const target = useMemo(() => ({ coffee: new THREE.Color(), highlight: new THREE.Color() }), []);

  useFrame((state, dt) => {
    u.time.value = state.clock.elapsedTime;
    u.bend.value = THREE.MathUtils.damp(u.bend.value, state.pointer.x * 0.55, 3, dt);
    burst.current = Math.max(0, burst.current - dt * 1.6);
    u.thick.value = 1 + burst.current * 0.7;
    target.coffee.set(ROASTS[roast].coffee);
    target.highlight.set(ROASTS[roast].highlight);
    u.coffee.value.lerp(target.coffee, 1 - Math.exp(-dt * 4));
    u.highlight.value.lerp(target.highlight, 1 - Math.exp(-dt * 4));
  });

  return (
    <>
      <hemisphereLight args={["#fff6e8", "#d9a35b", 1.5]} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} color="#fff0dc" />
      <Stream u={u} />
      <Kettle u={u} ramp={ramp} />
      <Beans burst={burst} ramp={ramp} />
    </>
  );
}

export default function CoffeeScene({ roast, active = true }: { roast: Roast; active?: boolean }) {
  const burst = useRef(0);
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      className="!absolute inset-0"
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 2.3, 7], fov: 41 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerDown={() => (burst.current = 1)}
      aria-hidden="true"
    >
      <Rig roast={roast} burst={burst} />
    </Canvas>
  );
}
