import React, { useState } from 'react';

const InfoCard = ({ backgroundColor, amount, label, iconClass }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card d-flex flex-row justify-content-between mb-3"
      style={{
        backgroundColor: backgroundColor,
        borderRadius: '8px',
        padding: '30px',
        border: 'none',
      }}
    >
      <div className="d-flex flex-column justify-content-center ms-3">
        <h4 style={{ color: 'white' }}>{amount}</h4>
        <h5 style={{ color: 'white' }}>{label}</h5>
      </div>
      <span
        className={`${iconClass}`}
        style={{
          fontSize: 40,
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.3s ease', // Smooth transition for scaling
          transform: isHovered ? 'scale(1.7)' : 'scale(1)', // Zoom effect on hover
        }}
        onMouseEnter={() => setIsHovered(true)} // Set hovered state to true
        onMouseLeave={() => setIsHovered(false)} // Set hovered state to false
      ></span>
    </div>
  );
};

export default InfoCard;

