import { useState } from 'react';

export const useImagePlaceholder = () => {
  const [isImageLoad, setIsImageLoad] = useState(false);

  return { isImageLoad, setIsImageLoad };
};
