"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import './ControlPanel.css';
import Instructions from '../instructions/Instructions';
import Button from '../button/button';

const ControlPanel = () => {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(null);
  const [colorInputs, setColorInputs] = useState({
    mainColor: '#f5f5f5',
    secondary: '#e0e0e0',
    accent: '#ff8a80',
    accent2: '#ff5252'
  });
  const [generatedColors, setGeneratedColors] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  // update CSS vars
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
        return "Palette Source";
      case 3:
        return "Manual Color Input";
      case 4:
        return "Coolors Palette";
      case 5:
        return "Create Your Palette";
      case 6:
        return "AI Colour Generation";
      default:
        return "Lume: Interactive Colour Activity";
    }
  };

  // Huemint API color stuff
  const generateColors = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    // API config
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
      ],
      "palette": ["-", "-", "-", "-"]
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
      setGeneratedColors(newColors);
      
      setColorInputs({
        mainColor: newColors[0],
        secondary: newColors[1],
        accent: newColors[2],
        accent2: newColors[3]
      });

      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating color palette:", error);
      setGenerationError('Failed to generate colors. Please try again.');
      setIsGenerating(false);
    }
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
              <div className='ind-color'>
                <label className='ind-name-color'>Main Color:</label>
                <input 
                    type="color" 
                    className='input-container'
                    value={colorInputs.mainColor}
                    onChange={(e) => handleColorChange('mainColor', e.target.value)} 
                />
                <div className="color-preview" style={{ backgroundColor: colorInputs.mainColor }}></div>
              </div>
              <div className='ind-color'>
                <label className='ind-name-color'>Secondary:</label>
                <input 
                    type="color" 
                    className='input-container'
                    value={colorInputs.secondary} 
                    onChange={(e) => handleColorChange('secondary', e.target.value)} 
                />
                <div className="color-preview" style={{ backgroundColor: colorInputs.secondary }}></div>
              </div>
              <div className='ind-color'>
                <label className='ind-name-color'>Accent:</label>
                <input 
                    type="color" 
                    className='input-container'
                    value={colorInputs.accent} 
                    onChange={(e) => handleColorChange('accent', e.target.value)} 
                />
                <div className="color-preview" style={{ backgroundColor: colorInputs.accent }}></div>
              </div>
              <div className='ind-color'>
                <label className='ind-name-color'>Accent #2:</label>
                <input 
                    type="color" 
                    className='input-container'
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
              <input type="text" placeholder="Link goes here" className='input-container input-coolors'/>
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
            <Instructions num='3' instruct='Click to generate colors using Huemint'></Instructions>
            <div className='conPan-options'>
              <div>AI Color Generator</div>
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
            <div className='conPan-colors'>
                <div className="colorBox mainColor" style={{ backgroundColor: colorInputs.mainColor }}></div>
                <div className="colorBox secondaryColor" style={{ backgroundColor: colorInputs.secondary }}></div>
                <div className="colorBox accent1" style={{ backgroundColor: colorInputs.accent }}></div>
                <div className="colorBox accent2" style={{ backgroundColor: colorInputs.accent2 }}></div>
            </div>
            <div className='conPan-nav'>
                {step > 1 && <Button onClick={goBack}>GO BACK</Button>}
            </div>
        </section>
    </div>
  );
};

export default ControlPanel;