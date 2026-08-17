import '@testing-library/jest-dom'

// Mock Three.js and React Three Fiber for tests
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => children,
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    camera: {},
    gl: {},
    viewport: { width: 1000, height: 1000 },
    mouse: { x: 0, y: 0 }
  }))
}))

vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({ nodes: {}, materials: {}, animations: [] })),
  useAnimations: vi.fn(() => ({ actions: {} })),
  Html: ({ children }) => children,
  OrbitControls: () => null
}))

vi.mock('@react-spring/three', () => ({
  useSpring: vi.fn(() => ({})),
  animated: {
    mesh: 'div'
  }
}))

// Mock audio
Object.defineProperty(window, 'Audio', {
  value: vi.fn(() => ({
    play: vi.fn(),
    pause: vi.fn(),
    volume: 0.4,
    loop: true
  }))
})

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    getEntriesByType: vi.fn(() => [{
      loadEventEnd: 1000,
      loadEventStart: 500,
      domContentLoadedEventEnd: 800,
      domContentLoadedEventStart: 600
    }]),
    now: vi.fn(() => Date.now())
  }
})

// Mock matchMedia for theme detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
}) 