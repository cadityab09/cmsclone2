import React, { useState, useEffect } from 'react';
import '../CSS/ScrollingTitle.css';

const ScrollingTitle = () => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const contentWidth = 1500; // Set the width of the scrolling content
  const speed = 2; // Speed of the scroll

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollLeft((prev) => {
        if (prev <= -contentWidth) {
          return 0; // Reset scroll position when content ends
        }
        return prev - speed;
      });
    }, 10); // Adjust the speed here
    return () => clearInterval(interval); // Clean up interval when component is unmounted
  }, []);

  return (
    <div className="scrollable-container">
      <div
        className="scrollable-content"
        style={{ transform: `translateX(${scrollLeft}px)` }}
      >
        <p>माऊली हॉस्पिटल हे रुग्णांसाठी 24/7 सात सेवा उपलब्ध</p>
        
        {/* Repeat the content here for seamless scroll */}
      </div>
    </div>
  );
};

export default ScrollingTitle;
