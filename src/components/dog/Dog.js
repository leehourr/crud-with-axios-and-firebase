import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useEffect, useRef, useMemo } from "react";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";

export const Dog = () => {
  useEffect(() => {}, []);
  return (
    <Canvas style={{ text: "top", width: "100%", height: "100vh" }}>
      <ambientLight intensity={0.65} />
      <PresentationControls speed={1.5} global polar={[-Math.PI / 4,Math.PI / 4,0 ]}>
        <group
          position={[0, 1, 0]}
          rotation-z={0}
          rotation-y={-0.8}
          rotation-x={0.8}
        >
          <Scene />
        </group>
      </PresentationControls>
    </Canvas>
  );
};

const Box = ({ position }) => {
  const { scene } = useGLTF("/dog.glb");
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
    <mesh position={position} ref={ref}>
      <primitive object={scene} scale={0.4} />
    </mesh>
  );
};

const Inspector = ({ responsiveness = 20, children }) => {
  const { size } = useThree();
  const euler = useMemo(() => new THREE.Euler(), []);
  const [spring, set] = useSpring(() => ({
    rotation: [0, 0, 0],
  }));
  const bind = useDrag(({ delta: [dx, dy] }) => {
    euler.y += (dx / size.width) * responsiveness;
    // euler.x += (dy / size.width) * responsiveness;
    //euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 2, Math.PI / 2);
    set({ rotation: euler.toArray().slice(0, 3) });
  });
  return (
    <a.group {...bind()} {...spring}>
      {children}
    </a.group>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={["black"]} />
      <Inspector>
        <Box />
      </Inspector>
    </>
  );
};
