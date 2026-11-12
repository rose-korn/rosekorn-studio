"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5°, the spiral real roses grow in
const PETALS = 36;
const INK = "#151311";

/** 3-step toon ramp (cel shading, from Korn's kit) */
function useToonRamp() {
  return useMemo(() => {
    const tex = new THREE.DataTexture(new Uint8Array([90, 175, 255]), 3, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/** One petal: a plane cupped sideways and curled back at the tip */
function usePetalGeometry() {
  return useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 1.35, 24, 24);
    g.translate(0, 0.675, 0); // base at origin
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      const t = THREE.MathUtils.clamp(y / 1.35, 0, 1); // 0 at base -> 1 at tip
      // taper: narrow base, round top
      // elliptical outline: narrow base, widest high up, round top
      const width = Math.sqrt(Math.max(0, Math.sin(Math.PI * Math.pow(t, 0.7)))) + 0.04;
      const nx = x * width;
      // cup across the petal + curl outward near the tip
      const cup = nx * nx * 0.9;
      const curl = Math.pow(t, 2.4) * -0.55;
      p.setXYZ(i, nx, y, cup + curl);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

/** Ink outline along the petal's edge (left side up, across the top, right side down) */
function usePetalOutline(geometry: THREE.BufferGeometry) {
  return useMemo(() => {
    const p = geometry.attributes.position;
    const n = 25; // PlaneGeometry(…, 24, 24) has 25 vertices per row; row 0 is the top
    const at = (row: number, col: number) => new THREE.Vector3(p.getX(row * n + col), p.getY(row * n + col), p.getZ(row * n + col));
    const pts: THREE.Vector3[] = [];
    for (let r = n - 1; r >= 0; r--) pts.push(at(r, 0));
    for (let c = 1; c < n; c++) pts.push(at(0, c));
    for (let r = 1; r < n; r++) pts.push(at(r, n - 1));
    return pts;
  }, [geometry]);
}

function Rose() {
  const group = useRef<THREE.Group>(null);
  const geometry = usePetalGeometry();
  const ramp = useToonRamp();
  const outline = usePetalOutline(geometry);

  const petals = useMemo(
    () =>
      Array.from({ length: PETALS }, (_, i) => {
        const k = i / (PETALS - 1); // 0 inner -> 1 outer
        const color = new THREE.Color().lerpColors(
          new THREE.Color("#c42f4b"),
          new THREE.Color("#ff9fb0"),
          Math.pow(k, 0.8),
        );
        return {
          yaw: i * GOLDEN_ANGLE,
          // inner petals stand up and wrap the bud, outer ones open out
          tilt: THREE.MathUtils.lerp(0.08, 1.25, Math.pow(k, 1.3)),
          scale: THREE.MathUtils.lerp(0.38, 1.05, Math.pow(k, 0.6)),
          lift: THREE.MathUtils.lerp(0.25, 0, k),
          color,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // scroll gives the rose an extra spin and a small bloom
    const scroll = Math.min(1, window.scrollY / window.innerHeight);
    g.rotation.y += delta * (0.18 + scroll * 1.2);
    const s = 1 + scroll * 0.12;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 4, delta));
    // lean toward the pointer, eased
    const tx = state.pointer.y * 0.35 + 0.55;
    const tz = -state.pointer.x * 0.3;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, tz, 3, delta);
  });

  return (
    <group ref={group} rotation={[0.55, 0, 0]} position={[0, -0.45, 0]}>
      {petals.map((p, i) => (
        <group key={i} rotation={[0, p.yaw, 0]} position={[0, p.lift, 0]}>
          <mesh geometry={geometry} rotation={[p.tilt, 0, 0]} position={[0, 0, 0.06]} scale={p.scale}>
            <meshToonMaterial color={p.color} gradientMap={ramp} side={THREE.DoubleSide} />
          </mesh>
          <group rotation={[p.tilt, 0, 0]} position={[0, 0, 0.06]} scale={p.scale}>
            <Line points={outline} color={INK} lineWidth={1.6} />
          </group>
        </group>
      ))}
    </group>
  );
}

/** Slow gold "pollen" around the flower */
function Pollen({ count = 70 }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 1.4;
      const th = Math.random() * Math.PI * 2;
      a[i * 3] = Math.cos(th) * r;
      a[i * 3 + 1] = (Math.random() - 0.5) * 2.6;
      a[i * 3 + 2] = Math.sin(th) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return g;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y -= d * 0.05;
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#e0475e" size={0.05} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      className="!absolute inset-0"
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 5.8], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <hemisphereLight args={["#ffffff", "#f7a8c4", 1.4]} />
      <directionalLight position={[3, 5, 4]} intensity={2.6} color="#ffe2c8" />
      <directionalLight position={[-4, -1, -3]} intensity={0.6} color="#5bcefa" />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
        <Rose />
      </Float>
      <Pollen />
    </Canvas>
  );
}
