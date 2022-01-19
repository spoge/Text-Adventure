import React from "react";
import "../styles/Terminal.css";

const Terminal = ({ children }) => {
  return (
    <div className="terminal-window">
      <div className="scanline" />
      <div className="crt-lines" />
      <div className="radial-background" />
      <div className="terminal">{children}</div>
    </div>
  );
};

export default Terminal;
