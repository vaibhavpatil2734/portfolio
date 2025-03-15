import React from 'react';
import './Projects.css';

export default function Projects() {
  const projects = [
    { title: "Project-Management-Tool", image: "./project11.png", link: "https://project-management-tool2734.netlify.app" },
    { title: "Wellnessnest", image: "./project22.png", link: "https://wellnessnest.netlify.app/" },
    { title: "EchoMeet", image: "./project4.png", link: "http://echomeet1.netlify.app" },
    { title: "LinkVault", image: "./project3.png", link: "https://linkvault1.netlify.app" },
  ];

  return (
    <div className="projects-container">
      <h6 className="projects-title">My Recent Projects</h6>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-box">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-overlay">
              <h4 className="project-name">{project.title}</h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
