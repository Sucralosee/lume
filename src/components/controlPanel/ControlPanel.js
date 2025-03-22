"use client";
import { useState } from 'react';
import React from 'react';
import gsap from 'gsap';
import './ControlPanel.css';
import Instructions from '../instructions/Instructions';
import Button from '../button/button';

const ControlPanel = ({ title }) => {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(null); // To track where user came from
  const [colorInputs, setColorInputs] = useState({
    mainColor: '#dadada',
    secondary: '#dadada',
    accent: '#dadada',
    accent2: '#dadada'
  });
  const [generatedColors, setGeneratedColors] = useState([]);

  const handleColorChange = (field, value) => {
    setColorInputs({
      ...colorInputs,
      [field]: value
    });
  };

  const generateColors = () => {
    // This is a placeholder - you would implement your color generation logic here
    setGeneratedColors(['#e1e1e1', '#c2c2c2', '#a3a3a3', '#858585']);
  };

  const goBack = () => {
    if (prevStep) {
      setStep(prevStep);
      setPrevStep(null);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const navigateTo = (nextStep) => {
    setPrevStep(step);
    setStep(nextStep);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <Instructions num='1' instruct='Do you have a palette already?'></Instructions>
            <div className='conPan-options'>
              <Button onClick={() => navigateTo(2)}>YES</Button>
              <Button onClick={() => navigateTo(5)}>NO</Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Instructions num='2' instruct='From where?'></Instructions>
            <div className='conPan-options'>
              <div>From Coolors?</div>
              <Button onClick={() => navigateTo(4)}>YES</Button>
            </div>
            <div className='conPan-options'>
              <div>Manual Input</div>
              <Button onClick={() => navigateTo(3)}>YES</Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <Instructions num='3' instruct='Create your palette'></Instructions>
            <div className='color-input-container'>
              <div>
                <label>Main Color:</label>
                <input 
                  type="text" 
                  value={colorInputs.mainColor} 
                  onChange={(e) => handleColorChange('mainColor', e.target.value)} 
                />
                <div className="color-preview" style={{ backgroundColor: colorInputs.mainColor }}></div>
              </div>
              <div>
                <label>Secondary:</label>
                <input 
                  type="text" 
                  value={colorInputs.secondary} 
                  onChange={(e) => handleColorChange('secondary', e.target.value)} 
                />
                <div className="color-preview" style={{ backgroundColor: colorInputs.secondary }}></div>
              </div>
              <div>
                <label>Accent:</label>
                <input 
                  type="text" 
                  value={colorInputs.accent} 
                  onChange={(e) => handleColorChange('accent', e.target.value)} 
                />
                <div className="color-preview" style={{ backgroundColor: colorInputs.accent }}></div>
              </div>
              <div>
                <label>Accent #2:</label>
                <input 
                  type="text" 
                  value={colorInputs.accent2} 
                  onChange={(e) => handleColorChange('accent2', e.target.value)} 
                />
                <div className="color-preview" style={{ backgroundColor: colorInputs.accent2 }}></div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <Instructions num='3' instruct='I have a Coolors palette'></Instructions>
            <div>
              <label>Cooler export URL:</label>
              <input type="text" placeholder="Link goes here" />
            </div>
          </>
        );
      case 5:
        return (
          <>
            <Instructions num='2' instruct='Create your own palette'></Instructions>
            <div className='conPan-options'>
              <div>Manual Input</div>
              <Button onClick={() => navigateTo(3)}>YES</Button>
            </div>
            <div className='conPan-options'>
              <div>Colour Generator</div>
              <Button onClick={() => navigateTo(6)}>YES</Button>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <Instructions num='3' instruct='Click to generate'></Instructions>
            <div className='conPan-options'>
              <div>Colour Generator</div>
              <Button onClick={generateColors}>Generate</Button>
            </div>
            {generatedColors.length > 0 && (
              <div className='generated-colors'>
                {generatedColors.map((color, index) => (
                  <div 
                    key={index} 
                    className="color-box" 
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
                <Button>Copy Colours</Button>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className='conPan-container'>
      <div className='title-container'>
        <div className='title-bot'>
          <h2>{title}</h2>
        </div>
      </div>
      <div className='conPan-content'>
        {renderStep()}
      </div>
      <div className='conPan-nav'>
        {step > 1 && <Button onClick={goBack}>Back</Button>}
      </div>
    </section>
  );
};

export default ControlPanel;