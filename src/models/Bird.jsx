import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { getDRACOLoader } from '../utils/dracoLoader'
import { useFrame } from '@react-three/fiber';
import birdScene from '../assets/3d/bird.glb'

const Bird = () => {
  const group = useRef()
  // Use DracoLoader for compressed GLB
  const { scene, animations } = useGLTF(birdScene, true, loader => {
    loader.setDRACOLoader(getDRACOLoader())
  })
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && actions['Take 001']) {
      actions['Take 001'].play();
    }
  }, [actions]);

  useFrame(({clock, camera}) => {
    if (!group.current) return;
    
    group.current.position.y = Math.sin(clock.elapsedTime ) * 0.2 + 2;

    if (group.current.position.x > camera.position.x + 10) {
      group.current.rotation.y = Math.PI
    } else if (group.current.position.x < camera.position.x - 10) {
      group.current.rotation.y = 0
    }
    if(group.current.rotation.y === 0){
        group.current.position.x += 0.01;
        group.current.position.z -= 0.01;
      } else {
      group.current.position.x -= 0.01;
      group.current.position.z += 0.01;

    }
  })

  // Check if the model loaded properly
  if (!scene) {
    return null;
  }

  return (
    <group position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={group}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(birdScene)

export default Bird