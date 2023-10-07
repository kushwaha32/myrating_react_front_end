import { useState } from "react";
import "./toggledSwitch.css";

const ToggledSwitch = ({ publicStatus }) => {
  return (
    <div className={`toggle-public ${publicStatus && "toggle-private"} `}>
      <span className="toggle-text">{publicStatus ? "private" : "public"}</span>
      <span className="notch"></span>
    </div>
  );
};

export default ToggledSwitch;
