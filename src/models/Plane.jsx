import { useEffect, useRef } from 'react'
import planeScene from '../assets/3d/plane.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { getDRACOLoader } from '../utils/dracoLoader'

const Plane = ({ isRotating, ...props}) => {
  const ref = useRef();
  // Use DracoLoader for compressed GLB
  const {scene, animations} = useGLTF(planeScene, true, loader => {
    loader.setDRACOLoader(getDRACOLoader())
  });
  const { actions } = useAnimations( animations, ref );

  useEffect(() => {
    if (actions && actions['Take 001']) {
      // Always keep propeller animation active
      actions['Take 001'].reset().fadeIn(0.5).play();
    }
  }, [actions])

  useEffect(() => {
    if (actions && actions['Take 002']) {
      // Wiggle animation only when rotating
      if (isRotating) {
        actions['Take 002'].reset().fadeIn(0.3).play();
      } else {
        actions['Take 002'].fadeOut(0.3);
      }
    }
  }, [actions, isRotating])

  // Check if the model loaded properly
  if (!scene) {
    return null;
  }

  return (
    <group {...props} ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(planeScene)

export default Plane