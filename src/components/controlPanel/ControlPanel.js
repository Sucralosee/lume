"use client";

import { useEffect } from 'react';
import React from 'react';
import gsap from 'gsap';
import './ControlPanel.css';
import Instructions from '../instructions/Instructions';
import Button from '../button/button';

const ControlPanel = ({ title }) => {

  return (
    <section className='conPan-container'>
        <div className='title-container'>
            <div className='title-bot'>
                <h2>{title}</h2>
            </div>
        </div>
        <div className='conPan-content'>
            <Instructions num='1' instruct='Do you have a palette already?'></Instructions>
            <div className='conPan-options'>
                <Button>Yes</Button>
                <Button>No</Button>
            </div>
        </div>
        <div className='conPan-nav'>
            <Button>Back</Button>
        </div>
    </section>
  );
};

export default ControlPanel;