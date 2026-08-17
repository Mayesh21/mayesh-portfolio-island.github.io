import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Singleton DRACOLoader instance shared across all models
let dracoLoader = null;

export const getDRACOLoader = () => {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  }
  return dracoLoader;
};
