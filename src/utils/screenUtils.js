// Screen size breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280
};

// Check if current screen size matches breakpoint
export const isMobile = () => window.innerWidth < BREAKPOINTS.MOBILE;
export const isTablet = () => window.innerWidth >= BREAKPOINTS.MOBILE && window.innerWidth < BREAKPOINTS.TABLET;
export const isDesktop = () => window.innerWidth >= BREAKPOINTS.DESKTOP;

// 3D Model positioning utilities
export const getIslandPosition = () => {
  const screenScale = isMobile() ? [0.9, 0.9, 0.9] : [1, 1, 1];
  const screenPosition = [0, -6.5, -43];
  const rotation = [0.1, 4.5, 0];
  
  return { scale: screenScale, position: screenPosition, rotation };
};

export const getPlanePosition = () => {
  const screenScale = isMobile() ? [1.5, 1.5, 1.5] : [3, 3, 3];
  const screenPosition = isMobile() ? [0, -1.5, 0] : [0, -4, -4];
  
  return { scale: screenScale, position: screenPosition };
};

export const getFoxPosition = () => {
  return {
    position: [0.5, 0.35, 0],
    rotation: [12.6, -0.6, 0],
    scale: [0.5, 0.5, 0.5]
  };
};

// Responsive text utilities
export const getResponsiveTextSize = (mobile, tablet, desktop) => {
  if (isMobile()) return mobile;
  if (isTablet()) return tablet;
  return desktop;
};

// Camera settings
export const getCameraSettings = (type = 'default') => {
  const settings = {
    default: {
      position: [0, 0, 5],
      fov: 75,
      near: 0.1,
      far: 1000
    },
    home: {
      near: 0.1,
      far: 1000
    }
  };
  
  return settings[type] || settings.default;
}; 