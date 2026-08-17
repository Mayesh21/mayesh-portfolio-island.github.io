/* eslint-disable react/no-unknown-property */
import { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import ThreeDLoader from '../components/3DLoader'
import ErrorBoundary from '../components/ErrorBoundary'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import { getIslandPosition, getPlanePosition, getCameraSettings } from '../utils/screenUtils'
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons'


const Home = () => {
  const audioRef = useRef(null);
  if (!audioRef.current) {
    audioRef.current = new Audio(sakura);
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
  }
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [planeDirection, setPlaneDirection] = useState(Math.PI / 2); // Track plane's facing direction, default facing left
  const [islandRotationState, setIslandRotationState] = useState(0); // Track island's rotation
  const [isLoading, setIsLoading] = useState(true);

  // Memoize expensive calculations
  const { scale: islandScale, position: islandPosition, rotation: islandRotation } = useMemo(() => getIslandPosition(), []);
  const { scale: planeScale, position: planePosition } = useMemo(() => getPlanePosition(), []);

  useEffect(() => {
    if(isPlayingMusic) audioRef.current.play();
    return () => audioRef.current.pause();
  }, [isPlayingMusic]);

  // Set loading to false after a short delay to ensure 3D models are loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className='w-full h-screen relative'>
      {/* Accessibility instructions - hidden visually but available to screen readers */}
      <div id="island-instructions" className="sr-only">
        Interactive 3D island. Use your mouse to click and drag to rotate the island, or use the left and right arrow keys to rotate. 
        The island has different sections that reveal information about the portfolio.
      </div>
      
      {/* Simple accessibility announcement */}
      <div className="sr-only" aria-live="polite">
        Interactive 3D portfolio environment loaded. Use mouse or arrow keys to explore.
      </div>
      
      {!isLoading && (
        <div className='absolute top-40 sm:top-28 left-0 right-0 z-10 flex items-center justify-center px-4'>
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>
      )}
        <Canvas
            className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'} touch-none`}
            camera={getCameraSettings('home')}
            gl={{ 
              antialias: false, // Disable antialiasing for better performance
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
              alpha: false
            }}
            performance={{ min: 0.8 }} // Higher performance threshold
        >
            <Suspense fallback={<ThreeDLoader />}>
              <ErrorBoundary is3D={true}>
                <directionalLight position={[1, 1, 1]} intensity={2} />
                <ambientLight intensity={0.5} />
                <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1} />
                <Sky isRotating={isRotating} planeDirection={planeDirection} islandRotation={islandRotationState} />
                <Bird />
                <Island 
                  position={islandPosition}
                  scale={islandScale}
                  rotation={islandRotation}
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                  currentStage={currentStage}
                  setCurrentStage={setCurrentStage}
                  planeDirection={planeDirection}
                  setPlaneDirection={setPlaneDirection}
                  islandRotation={islandRotationState}
                  setIslandRotation={setIslandRotationState}
                />
                <Plane
                  isRotating={isRotating}
                  position={planePosition}
                  scale={planeScale}
                  rotation={[0, planeDirection, 0]}
                />
              </ErrorBoundary>
            </Suspense>
        </Canvas>
        <div className='absolute left-2 bottom-2'>
          <img src={isPlayingMusic ? soundoff : soundon} alt='sound' onClick={() => setIsPlayingMusic(!isPlayingMusic)} className='w-10 h-10 cursor-pointer' />
        </div>
    </section>
  )
}

export default Home