
import React, { useState } from 'react';

const Buton = ({ children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button 
      onClick={onClick}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: isHovered ? '#273866' : '#ff9f43', // Changes color on hover
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '17px',
        height: '50px',   
        transition: 'background-color 0.3s ease', // Smooth transition
      }}
    >
      {children}
    </button>
  );
};

export default Buton;


