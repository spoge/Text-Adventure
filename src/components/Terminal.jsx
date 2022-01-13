import React from "react";
import "./Terminal.css";

const Terminal = ({ children }) => {
  return (
    <div className="terminal-window">
      <div className="terminal-wrapper">
        <div className="scanline"></div>
        <div className="crt-lines"></div>
        <div className="radial-background"></div>
        <div className="terminal">
          <div className="terminal-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
