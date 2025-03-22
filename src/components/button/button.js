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
            .to(button.querySelector('::before') || button.childNodes[0], {
              scaleX: 1,
              duration: 0.1,
              ease: "power2.out"
            }, 0)
            .to(button, {
              color: "white",
              duration: 0.05,
              ease: "power1.out"
            }, 0.1);
          
          button.addEventListener('mouseenter', () => hoverTimeline.play());
          button.addEventListener('mouseleave', () => hoverTimeline.reverse());
        });
        
        return () => {
          buttons.forEach(button => {
            button.removeEventListener('mouseenter', () => {});
            button.removeEventListener('mouseleave', () => {});
          });
        };
      }, []);


  return (
    <button onClick={onClick} className='btn border-red-500' >
      {children}
    </button>
  );
};

export default Button;