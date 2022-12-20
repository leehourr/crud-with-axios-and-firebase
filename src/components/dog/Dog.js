import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useState, useRef, useMemo } from "react";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";

let speed = true;

export const Dog = () => {
  const [speedUp, setSpeedUp] = useState(true);

  setTimeout(() => {
    setSpeedUp(false);
  }, [820]);
   speed= speedUp;
  return (
    <Canvas style={{ text: "top", width: "100%", height: "100vh" }}>
      <ambientLight intensity={0.7} />
      <PresentationControls
        speed={1.5}
        global
        polar={[-Math.PI / 4, Math.PI / 4, 0]}
      >
        <group
          position={[0, 1, 0]}
          rotation-z={0}
          rotation-y={-0.8}
          rotation-x={0.8}
        >
          <Scene speed={speedUp} />
        </group>
      </PresentationControls>
    </Canvas>
  );
};

const Box = ({ position }) => {
  const { scene } = useGLTF("/dog.glb");
  const ref = useRef();
  let spin;
  spin = speed ? 0.4 : 0.01;
  useFrame(() => (ref.current.rotation.y += spin));

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

const Scene = ({ speed }) => {
  return (
    <>
      <color attach="background" args={["black"]} />
      <Inspector>
        <Box speed={speed} />
      </Inspector>
    </>
  );
};
