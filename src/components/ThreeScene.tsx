import { Float, MeshDistortMaterial, Sphere, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// --- ASSAVA Collective Palette: Pure black bg + warm caramel/amber beans ---
// Pulled directly from screenshot: #C68E5D (main), #A67C52 (shadow), #D4A373 (highlight), #8B5E34 (deep)
const BEAN_PALETTE = [
  { color: "#C68E5D", roughness: 0.18, metalness: 0.18 },   // ASSAVA hero caramel
  { color: "#A67C52", roughness: 0.28, metalness: 0.10 },   // shadow tone
  { color: "#D4A373", roughness: 0.12, metalness: 0.22 },   // highlight / lit face
  { color: "#B88A5E", roughness: 0.22, metalness: 0.15 },   // mid tone
];

export function BeanCluster() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture('https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=500');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 1.5,
        scrollTrigger: {
          trigger: '.hero-beans-container',
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const beansCount = 150; // High-density surrounding ritual
  const beans = useMemo(() => {
    const b = [];
    for (let i = 0; i < beansCount; i++) {
      const radius = 15 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 45;
      const variant = BEAN_PALETTE[Math.floor(Math.random() * BEAN_PALETTE.length)];
      b.push({
        initialPos: new THREE.Vector3(
          radius * Math.cos(angle),
          height,
          radius * Math.sin(angle)
        ),
        scale: 0.003 + Math.random() * 0.008, // Smaller beans for cinematic scale
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        speed: 0.01 + Math.random() * 0.04, // Slower, more majestic revolution
        ...variant
      });
    }
    return b;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.position.y += Math.sin(time * 0.3) * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ASSAVA-accurate fog: pure black, tight range for cinematic depth */}
      <AssavaFog />
      {/* ASSAVA lighting: warm amber key + cool dark fill */}
      <AssavaLightingRig />

      {/* Hero center bean (Large & Ethereal) */}
      <group scale={1.8} position={[0, 0, -15]}>
        <ClusterBean
          initialPos={new THREE.Vector3(0, 0, 0)}
          scale={0.08}
          rotation={new THREE.Euler(0.4, 0.2, 0.1)}
          speed={0.05}
          mouse={mouse}
          texture={texture}
          color="#C68E5D"
          roughness={0.8}    // Higher roughness for that soft look in the screenshot
          metalness={0.1}
          opacity={0.4}      // Translucent like the reference
          transparent
        />
      </group>

      {/* Explosive Surrounding Discovery Ritual */}
      {beans.map((bean, i) => (
        <ClusterBean key={i} {...bean} mouse={mouse} texture={texture} />
      ))}

      {/* ASSAVA golden orb glow — mimics the radial amber halo in screenshot */}
      <AssavaOrbGlow />
    </group>
  );
}

// --- Fog: Pure black, tight — exactly as screenshot (#000000 bg) ---
function AssavaFog() {
  const { scene } = useThree();
  useEffect(() => {
    // Pure black fog matching ASSAVA's void background
    scene.fog = new THREE.Fog(0x000000, 18, 55);
    scene.background = new THREE.Color(0x000000);
  }, [scene]);
  return null;
}

// --- ASSAVA Lighting: matches the screenshot's warm amber key light ---
function AssavaLightingRig() {
  return (
    <>
      {/* Very dim ambient — keeps scene from being flat black */}
      <ambientLight intensity={0.08} color="#1A0E05" />

      {/* KEY LIGHT: warm amber-gold from upper right — ASSAVA hero glow */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.2}
        color="#C8852A"   // amber-gold matching the orb in screenshot
      />

      {/* FILL LIGHT: barely-there warm from left — lifts shadow side softly */}
      <pointLight
        position={[-8, 3, 3]}
        intensity={0.5}
        color="#F5DDB0"   // warm ivory, very soft
        distance={30}
        decay={2}
      />

      {/* RIM / BACK LIGHT: deep brown — separates bean from void */}
      <pointLight
        position={[0, -2, -12]}
        intensity={1.5}
        color="#6B3A1A"   // deep espresso brown
        distance={25}
        decay={2}
      />

      {/* HERO SPOT: tight warm spot on center bean — like the orb glow */}
      <spotLight
        position={[0, 6, 8]}
        intensity={3.5}
        color="#D4913B"   // rich amber
        angle={0.35}
        penumbra={0.9}
        distance={40}
        decay={2}
      />
    </>
  );
}

// --- ASSAVA Orb Glow: replicates the warm radial halo in the screenshot ---
function AssavaOrbGlow() {
  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.1}>
      <Sphere args={[1, 48, 48]} scale={3.5} position={[0, 0, -8]}>
        <MeshDistortMaterial
          color="#7A4010"          // deep amber-brown orb core
          speed={0.4}
          distort={0.06}
          radius={0.4}
          metalness={0.0}
          roughness={1.0}
          // opacity={0.18}           // very subtle — just a warm haze
          transparent
          depthWrite={false}
        />
      </Sphere>
      {/* Outer glow halo — wider, more diffuse */}
      <Sphere args={[1, 32, 32]} scale={6.5} position={[0, 0, -10]}>
        <MeshDistortMaterial
          color="#5C2E08"
          speed={0.3}
          distort={0.03}
          radius={1}
          metalness={0.0}
          roughness={1.0}
          opacity={0.08}
          transparent
          depthWrite={false}
        />
      </Sphere>
    </Float>
  );
}

// --- Bean mesh: ASSAVA caramel with high clearcoat for that lacquered look ---
function ClusterBean({ initialPos, scale, rotation, speed, mouse, texture, color, roughness, metalness, opacity = 1, transparent = false }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const worldPos = groupRef.current.getWorldPosition(new THREE.Vector3());
    const mouseV3 = tempVec.set(mouse.current.x * 12, mouse.current.y * 12, 10);
    const dist = worldPos.distanceTo(mouseV3);

    const interactionRadius = 10;
    const repulsionStrength = dist < interactionRadius ? (interactionRadius - dist) * 1.5 : 0;
    const centerDir = new THREE.Vector3(0, 0, 0).sub(worldPos).normalize();
    const finalTarget = initialPos.clone();

    if (repulsionStrength > 0 && groupRef.current?.parent) {
      const parentQuaternion = groupRef.current.parent.quaternion;
      if (parentQuaternion) {
        centerDir.applyQuaternion(parentQuaternion.clone().invert());
        finalTarget.lerp(new THREE.Vector3(0, 0, 0), (repulsionStrength / interactionRadius) * 0.8);
      }
    }

    groupRef.current.position.lerp(finalTarget, 0.08);

    const isHovered = dist < 2.5;
    const scaleFactor = isHovered ? 1.015 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1);

    groupRef.current.rotation.x += 0.005 * speed;
    groupRef.current.rotation.y += 0.008 * speed;

    // Hover colour shift: caramel → deep espresso
    groupRef.current.children.forEach((child: any) => {
      if (child.material) {
        child.material.color.lerp(
          new THREE.Color(isHovered ? "#6B3A1A" : color),
          0.1
        );
      }
    });
  });

  return (
    <group ref={groupRef} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Left lobe */}
      <mesh position={[-0.1, 0, 0]} scale={[0.85, 1.4, 0.65]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          map={texture}
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={1.0}           // high clearcoat = ASSAVA lacquered look
          clearcoatRoughness={0.05}
          reflectivity={0.7}
          emissive="#120800"
          emissiveIntensity={0.04}
          opacity={opacity}
          transparent={transparent}
        />
      </mesh>
      {/* Right lobe */}
      <mesh position={[0.1, 0, 0]} scale={[0.85, 1.4, 0.65]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          map={texture}
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={0.7}
          emissive="#120800"
          emissiveIntensity={0.04}
          opacity={opacity}
          transparent={transparent}
        />
      </mesh>
    </group>
  );
}

// --- Standalone exports (unchanged, colours aligned) ---

export function CoffeeBean({ position, rotation, scale, texture }: any) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });
  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <mesh position={[-0.1, 0, 0]} scale={[0.85, 1.4, 0.65]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#C68E5D" map={texture} roughness={0.18} metalness={0.18} clearcoat={1.0} reflectivity={0.7} />
      </mesh>
      <mesh position={[0.1, 0, 0]} scale={[0.85, 1.4, 0.65]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#C68E5D" map={texture} roughness={0.18} metalness={0.18} clearcoat={1.0} reflectivity={0.7} />
      </mesh>
    </group>
  );
}

export function CoffeeDust({ count = 200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 55;
      p[i * 3 + 1] = (Math.random() - 0.5) * 55;
      p[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return p;
  }, [count]);
  const meshRef = useRef<THREE.Points>(null);
  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.0001; });
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      {/* Dust matches ASSAVA caramel tone, ultra subtle */}
      <pointsMaterial transparent color="#C68E5D" size={0.025} sizeAttenuation depthWrite={false} opacity={0.08} />
    </points>
  );
}

export function CoffeeSteam({ count = 10 }) {
  const meshRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 8,
        z: (Math.random() - 0.5) * 4,
        speed: 0.002 + Math.random() * 0.005,
        op: 0.008 + Math.random() * 0.025,  // slightly more transparent than before
      });
    }
    return p;
  }, [count]);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.children.forEach((c, i) => {
        c.position.y += particles[i].speed;
        if (c.position.y > 8) c.position.y = 0;
      });
    }
  });
  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} scale={0.06}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color="#C8852A" transparent opacity={p.op} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function ExplodingHeroBean() {
  const texture = useTexture('https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=500');
  const ref = useRef<THREE.Group>(null);
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0015; });
  return (
    <group ref={ref}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <group scale={1.2}>
          <mesh position={[-0.1, 0, 0]} scale={[0.85, 1.4, 0.65]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial color="#C68E5D" map={texture} roughness={0.18} metalness={0.18} clearcoat={1.0} reflectivity={0.7} />
          </mesh>
          <mesh position={[0.1, 0, 0]} scale={[0.85, 1.4, 0.65]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial color="#C68E5D" map={texture} roughness={0.18} metalness={0.18} clearcoat={1.0} reflectivity={0.7} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export function LiquidBlob() {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <Sphere args={[1, 64, 64]} scale={1.8} position={[0, -2, -10]}>
        {/* Matches ASSAVA amber orb — caramel with low opacity */}
        <MeshDistortMaterial
          color="#C68E5D"
          speed={1.2}
          distort={0.25}
          radius={1}
          metalness={0.1}
          roughness={0.6}
          opacity={0.18}
          transparent
        />
      </Sphere>
    </Float>
  );
}