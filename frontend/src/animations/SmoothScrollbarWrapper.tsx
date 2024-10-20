// src/components/SmoothScrollbarWrapper.tsx
import React, { useEffect, ReactNode } from 'react';
import Scrollbar from 'smooth-scrollbar';

interface SmoothScrollbarWrapperProps {
  children: ReactNode; // Props for children
}

const SmoothScrollbarWrapper: React.FC<SmoothScrollbarWrapperProps> = ({ children }) => {
  useEffect(() => {
    const options = {
      damping: 0.05, // Lower values result in smoother scrolling
      thumbMinSize: 20, // Minimum size for the scrollbar thumb
      renderByPixels: true, // Render using pixel values for smoother animations
      continuousScrolling: true, // Allows continuous scrolling at the boundaries
    };

    const scrollArea = document.querySelector('#scroll-area') as HTMLElement;
    let scrollbar: Scrollbar | undefined; // Declare scrollbar variable

    if (scrollArea) {
      scrollbar = Scrollbar.init(scrollArea, options); // Store the scrollbar instance
    }

    // Cleanup function to destroy the scrollbar on component unmount
    return () => {
      if (scrollbar) {
        scrollbar.destroy(); // Call destroy on the scrollbar instance
      }
    };
  }, []);

  return (
    // Wrapper div for the scroll area, with full viewport height
    <div id="scroll-area" style={{ height: '100vh', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

export default SmoothScrollbarWrapper;
