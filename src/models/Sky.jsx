/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { getDRACOLoader } from '../utils/dracoLoader'
import skyScene from '../assets/3d/sky.glb'

const Sky = ({ isRotating, planeDirection, islandRotation, ...props }) => {
  // Use DracoLoader for compressed GLB
  const { scene } = useGLTF(skyScene, true, loader => {
    loader.setDRACOLoader(getDRACOLoader())
  })
  const skyRef = useRef()
  const lastRotation = useRef(0)

  useFrame((_, delta) => {
    if (skyRef.current && islandRotation !== undefined && isRotating) {
      // Only animate sky when island is actually rotating
      const rotationDiff = Math.abs(islandRotation - lastRotation.current);
      if (rotationDiff > 0.0005) { // Smaller threshold for more responsive sky
        // Rotate sky based on plane direction for realistic perspective
        const rotationSpeed = 0.3 * delta;
        skyRef.current.rotation.y += rotationSpeed * Math.sin(planeDirection);
      }
      lastRotation.current = islandRotation;
    }
  })

  // Memoize the primitive — must be before any early return (Rules of Hooks)
  const skyPrimitive = useMemo(() => {
    if (!scene) return null;
    return <primitive object={scene} />;
  }, [scene]);

  if (!skyPrimitive) return null;

  return (
    <group ref={skyRef} {...props}>
      {skyPrimitive}
    </group>
  )
}

useGLTF.preload(skyScene)

export default Sky