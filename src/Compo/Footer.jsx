import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-center">
      <div
        className="d-flex justify-content-between align-items-center p-3 "
        style={{ backgroundColor: 'white', flexDirection: 'row' }}
      >
    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Copyright © 2024 Klargo. All rights reserved.
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Version 7.3.0.0 [20240330]
        </div>
      </div>
    </footer>
  );
};

export default Footer;

