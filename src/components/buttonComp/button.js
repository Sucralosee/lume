"use client";

import { useEffect } from 'react';
import React from 'react';
import gsap from 'gsap';
import './button.css';

const Button = ({ onClick, children }) => {

  useEffect(() => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      const hoverTimeline = gsap.timeline({ paused: true });
      
      hoverTimeline
        .to(button.querySelector('::before') || button, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(button, {
          color: "white",
          duration: 0.3,
          ease: "power1.out"
        }, 0);
      
      const mouseEnterHandler = () => {
        gsap.killTweensOf(button, "color");
        hoverTimeline.play();
      };
      
      const mouseLeaveHandler = () => {
        hoverTimeline.reverse();
      };
      
      button.addEventListener('mouseenter', mouseEnterHandler);
      button.addEventListener('mouseleave', mouseLeaveHandler);
      
      return () => {
        button.removeEventListener('mouseenter', mouseEnterHandler);
        button.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    });
  }, []);


  return (
    <button onClick={onClick} className='btn' >
      {children}
    </button>
  );
};

export default Button;