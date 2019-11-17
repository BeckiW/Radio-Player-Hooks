import React from "react";
import "./style.css";

const StationDesign = ({ image, color, name, url }) => {
  return (
    <div className="radio-box" style={{ backgroundColor: `#${color}` }}>
      <div className="radio-image">
        <img src={image} alt="bild" />
      </div>
      <div className="container">
        <div className="radio-name">
          <span>{name}</span>
        </div>
        <div className="audio-control">
          <audio controls>
            <source src={url} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default StationDesign;
