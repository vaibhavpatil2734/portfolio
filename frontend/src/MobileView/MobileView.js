import React, { useState, useEffect } from "react";
import "./MobileView.css";
import { FaDownload, FaEye } from "react-icons/fa";
import Contact from "../Panel/Contact/Contact";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const resume = require("./image.png");

export default function MobileView() {
  const roles = [
    "MERN Developer",
    "Cybersecurity Enthusiast",
    "Open Source Contributor",
    "Tech Blogger",
    "AI/ML Enthusiast",
  ];

  const projects = [
    { title: "Project Management Tool", image: "./project11.png", link: "https://project-management-tool2734.netlify.app" },
    { title: "WellnessNest", image: "./project22.png", link: "https://wellnessnest.netlify.app/" },
    { title: "LinkVault", image: "./project3.png", link: "https://linkvault1.netlify.app" },
    { title: "Project 4", image: "./project4.jpg", link: "https://project4.com" },
  ];

  const [currentRole, setCurrentRole] = useState("MERN Developer");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 1500;

    const updateText = () => {
      const role = roles[roleIndex];
      setCurrentRole(role.substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));

      if (!isDeleting && charIndex === role.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const typingInterval = setTimeout(updateText, typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [charIndex, isDeleting, roleIndex]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.download = "Vaibhav_Patil_Resume.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    window.open(resume, "_blank");
  };

  return (
    <div>
        <div className="mynavbar">
            <h4>Vaibhav's Workspace</h4>
        </div>
        <div>
        <div className="mobile-view">
      <div className="content-grid">
        <div className="top-info">
          <h1 className="mobile-header">Welcome to My Space!</h1>
          <h2 className="mobile-name">I'm <span className="highlight">Vaibhav Patil</span></h2>
          <p className="mobile-typing">{currentRole || "\u00A0"}</p>
        </div>

        <div className="section-break">✦ ✦ ✦</div>
        <h2 className="project-section-title">My Projects</h2>

        <div className="project-container">
          {projects.map((project, index) => (
            <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
              <img src={project.image} alt={project.title} className="project-image" />
              <p className="project-title">{project.title}</p>
            </a>
          ))}
        </div>

        <div className="section-break">✦ ✦ ✦</div>
        <h2 className="project-section-title">My Resume</h2>
        <div className="resume-box">
          <p className="resume-title">📄 Download or View My Resume</p>
          <div className="resume-buttons">
            <button className="small-btn" onClick={handleDownload}><FaDownload size={14} /> Download</button>
            <button className="small-btn" onClick={handleView}><FaEye size={14} /> View</button>
          </div>
        </div>
        <div className="section-break">✦ ✦ ✦</div>
        <h2 className="project-section-title">Contact</h2>
        <div className="contactinmobile"><Contact /></div>
         <footer className="footermobile">
                  <h6><p>Crafted with ❤️ by Vaibhav Patil | © {new Date().getFullYear()}</p></h6>
                  <h>
                  <div className="social-iconsmobile">
                    <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                  </div>
                  </h>
                </footer>
      </div>
    </div>
        </div>
    </div>
  );
}