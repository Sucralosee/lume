"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import './ControlPanel.css';
import Instructions from '../instructions/Instructions';
import Button from '../button/button';
import ColourInfo from '../colourInfo/ColourInfo';

const ControlPanel = () => {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(null);
  const [colorInputs, setColorInputs] = useState({
    mainColor: '#f5f5f5',
    secondary: '#242020',
    accent: '#ff8a80',
    accent2: '#ff5252'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--mainColor', colorInputs.mainColor);
    document.documentElement.style.setProperty('--secondaryColor', colorInputs.secondary);
    document.documentElement.style.setProperty('--accent1', colorInputs.accent);
    document.documentElement.style.setProperty('--accent2', colorInputs.accent2);
  }, [colorInputs]);

  const getDynamicTitle = () => {
    switch(step) {
      case 1:
        return "Welcome to Lume";
      case 2:
        return "Manual Color Input";
      case 3:
        return "AI Colour Generation";
      default:
        return "Lume: Interactive Colour Activity";
    }
  };

  const generateColors = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    const json_data = {
      "mode": "transformer",
      "num_colors": 4,
      "temperature": 1.2,
      "num_results": 5,
      "adjacency": [
        "0", "65", "45", "35",
        "65", "0", "35", "65",
        "45", "35", "0", "35", 
        "35", "65", "35", "0"
      ]
    };

    try {
      const response = await fetch("https://api.huemint.com/color", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json_data)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch color palette');
      }

      const data = await response.json();
      const newColors = data.results[0].palette;

      setColorInputs({
        mainColor: newColors[0],
        secondary: newColors[1],
        accent: newColors[2],
        accent2: newColors[3]
      });
    } catch (error) {
      console.error("Error generating color palette:", error);
      setGenerationError('Failed to generate colors. Please try again.');
    }
    setIsGenerating(false);
  };

  const handleColorChange = (field, value) => {
    setColorInputs({
      ...colorInputs,
      [field]: value
    });
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
            <Instructions num='1' instruct='How do you want to choose colours?'></Instructions>
            <div className='conPan-options'>
              <Button onClick={() => navigateTo(2)}>Manually</Button>
              <Button onClick={() => navigateTo(3)}>Generate</Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Instructions num='2' instruct='Create your palette manually'></Instructions>
            <div className='color-input-container'>
              {Object.keys(colorInputs).map((key) => (
                <div className='ind-color' key={key}>
                  <label className='ind-name-color'>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
                  <input 
                    type="color" 
                    className='input-container'
                    value={colorInputs[key]} 
                    onChange={(e) => handleColorChange(key, e.target.value)} 
                  />
                  <div className="color-preview" style={{ backgroundColor: colorInputs[key] }}></div>
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <Instructions num='3' instruct='Click to generate colors using Huemint'></Instructions>
            <div className='conPan-options'>
              <Button 
                onClick={generateColors} 
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Colors'}
              </Button>
            </div>
            {generationError && (
              <div className='error-message' style={{ color: 'red' }}>
                {generationError}
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <section className='conPan-header'>
        <h1>Lume</h1>
        <h3>Interactive Colour Activity</h3>
      </section>
      <section className='conPan-container'>
        <div className='title-container'>
          <div className='title-bot'>
            <h2>{getDynamicTitle()}</h2>
          </div>
        </div>
        <div className='conPan-content'>
          {renderStep()}
        </div>
        {/* <div className='conPan-colors'>
          {Object.keys(colorInputs).map((key) => (
            <div className={`colorBox ${key}`} key={key} style={{ backgroundColor: colorInputs[key] }}></div>
          ))}
        </div> */}
        <ColourInfo colorInputs={colorInputs} />
        <div className='conPan-nav'>
          {step > 1 && <Button onClick={goBack}>GO BACK</Button>}
        </div>
      </section>
    </div>
  );
};

export default ControlPanel;
