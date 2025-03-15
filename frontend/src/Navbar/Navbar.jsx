import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ setActiveSection }) => {
  // Function to handle smooth scrolling & update active section
  const onScrollToSection = (sectionId) => {
    setActiveSection(sectionId); // Update state
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#home" onClick={() => onScrollToSection("home")}>Vaibhav's Workbench</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home" onClick={() => onScrollToSection("home")}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gallery" onClick={() => onScrollToSection("gallery")}>Gallery</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects" onClick={() => onScrollToSection("projects")}>Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#resume" onClick={() => onScrollToSection("resume")}>Resume</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={() => onScrollToSection("contact")}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
