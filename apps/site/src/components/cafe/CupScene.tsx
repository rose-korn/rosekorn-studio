"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { C, ROASTS, type Roast } from "./palette";

/**
 * "Move the mouse": a cel-shaded latte cup on a saucer that turns to follow the pointer
 * anywhere on the page, tilting so you can peek at the latte art. On touch screens it turns
 * as you scroll. Click / tap = a full spin. Same toon ramp + ink hull look as the hero.
 */
const INK = C.ink;

function useRamp() {
  return useMemo(() => {
    const t = new THREE.DataTexture(new Uint8Array([110, 190, 255]), 3, 1, THREE.RedFormat);
    t.minFilter = t.magFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  }, []);
}

/** mesh + a slightly bigger back-faced copy in ink = the outline */
function Inked({ geo, color, ramp, hull = 1.04, ...rest }: { geo: THREE.BufferGeometry; color: string; ramp: THREE.Texture; hull?: number } & ThreeElements["group"]) {
  return (
    <group {...rest}>
      <mesh geometry={geo} scale={hull}>
        <meshBasicMaterial color={INK} side={THREE.BackSide} />
      </mesh>
      <mesh geometry={geo}>
        <meshToonMaterial color={color} gradientMap={ramp} />
      </mesh>
    </group>
  );
}

function heartShape() {
  const s = new THREE.Shape();
  s.moveTo(0, -0.32);
  s.bezierCurveTo(-0.5, 0.0, -0.32, 0.42, 0, 0.18);
  s.bezierCurveTo(0.32, 0.42, 0.5, 0.0, 0, -0.32);
  return s;
}

function Cup({ roast, spin }: { roast: Roast; spin: React.MutableRefObject<number> }) {
  const ramp = useRamp();
  const group = useRef<THREE.Group>(null);
  const aim = useRef({ x: 0, y: 0 });
  const coffeeMat = useRef<THREE.MeshToonMaterial>(null);
  const turned = useRef(0); // eased copy of the spin target

  const geos = useMemo(() => {
    // cup wall: a lathe profile, open at the top, with some thickness
    const prof = [
      [0.0, 0.0],
      [0.5, 0.0],
      [0.62, 0.08],
      [0.78, 0.55],
      [0.86, 0.95],
      [0.8, 0.95],
      [0.72, 0.56],
      [0.58, 0.14],
      [0.0, 0.14],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const cup = new THREE.LatheGeometry(prof, 56);
    const saucer = new THREE.LatheGeometry(
      [
        [0, 0],
        [1.2, 0.02],
        [1.38, 0.16],
        [1.3, 0.18],
        [1.1, 0.08],
        [0, 0.08],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
      56,
    );
    const handle = new THREE.TorusGeometry(0.24, 0.07, 12, 32, Math.PI * 1.3);
    const coffee = new THREE.CircleGeometry(0.79, 48);
    const heart = new THREE.ShapeGeometry(heartShape(), 24);
    const sugar = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const spoon = new THREE.CapsuleGeometry(0.05, 0.9, 4, 10);
    return { cup, saucer, handle, coffee, heart, sugar, spoon };
  }, []);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const move = (e: PointerEvent) => {
      if (coarse) return;
      aim.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      aim.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const scroll = () => {
      if (coarse) aim.current.x = Math.sin(window.scrollY * 0.004);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    coffeeMat.current?.color.set(ROASTS[roast].coffee);
  }, [roast]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-dt * 4);
    turned.current += (spin.current - turned.current) * (1 - Math.exp(-dt * 3));
    const ty = aim.current.x * 1.1 + turned.current;
    g.rotation.y += (ty - g.rotation.y) * k * 2;
    g.rotation.x += (0.38 + aim.current.y * 0.32 - g.rotation.x) * k;
    g.position.y = -0.45 + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
  });

  return (
    <group ref={group}>
      <Inked geo={geos.saucer} color={C.cream2} ramp={ramp} hull={1.03} position={[0, -0.02, 0]} />
      <Inked geo={geos.cup} color={C.cream} ramp={ramp} hull={1.04} position={[0, 0.06, 0]} />
      <Inked geo={geos.handle} color={C.cream} ramp={ramp} hull={1.15} position={[0.84, 0.56, 0]} rotation={[0, 0, -Math.PI * 0.65]} />
      {/* coffee + latte art */}
      <mesh geometry={geos.coffee} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.9, 0]}>
        <meshToonMaterial ref={coffeeMat} color={ROASTS[roast].coffee} gradientMap={ramp} />
      </mesh>
      <mesh geometry={geos.heart} rotation={[-Math.PI / 2, 0, Math.PI]} position={[0, 0.905, 0.04]}>
        <meshBasicMaterial color="#f6ead6" />
      </mesh>
      {/* a sugar cube and a spoon on the saucer */}
      <Inked geo={geos.sugar} color="#ffffff" ramp={ramp} hull={1.12} position={[-0.95, 0.2, 0.35]} rotation={[0, 0.5, 0]} />
      <Inked
        geo={geos.spoon}
        color={C.caramel}
        ramp={ramp}
        hull={1.25}
        position={[0.3, 0.15, 1.0]}
        rotation={[Math.PI / 2, 0, 1.25]}
      />
    </group>
  );
}

export default function CupScene({ roast, active = true }: { roast: Roast; active?: boolean }) {
  const spin = useRef(0);
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      className="!absolute inset-0"
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 2.2, 4.6], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.2, 0)}
      gl={{ antialias: true, alpha: true }}
      onPointerDown={() => (spin.current += Math.PI * 2)}
      aria-hidden="true"
    >
      <hemisphereLight args={["#fff6e8", "#d9a35b", 1.5]} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} color="#fff0dc" />
      <Cup roast={roast} spin={spin} />
    </Canvas>
  );
}
