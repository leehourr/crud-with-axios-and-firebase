import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PresentationControls, useGLTF } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useState, useRef, useMemo, Suspense, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";
import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
//this file should be in dog folder in components
//but it keep throwing error cuz the file not found so i had to move it here

export const Dog = () => {
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
          <Suspense fallback={<Loader />}>
            <Scene />
          </Suspense>
        </group>
      </PresentationControls>
    </Canvas>
  );
};

const Box = ({ position }) => {
  const [speed, setSpeed] = useState(0.6);
  const obj = useGLTF("/dog.glb");

  const ref = useRef();
  // console.log(isSlowDown);
  useEffect(() => {
    setTimeout(() => {
      setSpeed(0.2);
      // console.log(isSlowDown);
    }, [500]);
  }, []);

  setTimeout(() => {
    setSpeed(0.01);
    // console.log(isSlowDown);
  }, [1000]);

  useFrame(() => (ref.current.rotation.y += speed));
  return (
    <mesh position={position} ref={ref}>
      <primitive object={obj.scene} scale={0.4} />
    </mesh>
  );
};

useGLTF.preload("/dog.glb");

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
