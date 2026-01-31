import React from 'react';
import './RetroTerminal.css';

const RetroTerminal: React.FC = () => {
  return (
    <div className="retro-terminal-background">
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>
    </div>
  );
};

export default RetroTerminal;
