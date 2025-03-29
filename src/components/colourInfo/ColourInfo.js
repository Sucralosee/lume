"use client";
import { useState } from 'react';
import React from 'react';
import './ColourInfo.css';

const ColourInfo = ({ colorInputs }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const formatColourName = (name) => {
    return name.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <div className='conPan-colors tooltip-enabled'>
      {Object.keys(colorInputs).map((key) => (
        <div 
          className={`colorBox ${key} tooltip-container`} 
          key={key} 
          style={{ backgroundColor: colorInputs[key] }}
          onMouseEnter={() => setActiveTooltip(key)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          {activeTooltip === key && (
            <div className="color-tooltip">
              <p className="color-name">{formatColourName(key)}</p>
              <p className="color-hex">{colorInputs[key]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColourInfo;