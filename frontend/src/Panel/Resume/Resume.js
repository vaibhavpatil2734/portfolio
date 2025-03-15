import React from 'react';
import "./Resume.css";
import { FaDownload, FaEye } from "react-icons/fa";

const resume = require('./image.png');

export default function Resume() {
  return (
    <div className="resume-container">
      <h6 className="myresumetitle">My Resume</h6>
      <div className="resume-buttons">
        <a href={resume} download="MyResume.png">
          <button className="resume-button">
            <FaDownload /> Download
          </button>
        </a>
        <a href={resume} target="_blank" rel="noopener noreferrer">
          <button className="resume-button">
            <FaEye /> View
          </button>
        </a>
      </div>
    </div>
  );
}
