import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "react-image-lightbox/style.css";
import "./Panel.css";
import "../Terminal/Termianl.css";
import Home from "./Home/Home";
import Gallery from "./Gallery/Gallery";
import Projects from "./Projects/Projects";
import Resume from "./Resume/Resume";
import Contact from "./Contact/Contact";

const InfoPanel = ({ activeSection }) => {
  const canvasRef = useRef(null);
  const bodyRef = useRef(null); // Reference for scrolling container

  // Scroll to top whenever activeSection changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 26;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, x) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[x] = 0;
        }
        drops[x]++;
      });
    };

    const interval = setInterval(drawMatrix, 50);
    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="info-panel">
      <canvas ref={canvasRef} className="matrix-background matrixCanvas"></canvas>
      <div className="body" ref={bodyRef}> {/* Added ref for scrolling */}
        {activeSection === "home" && <Home />}
        {activeSection === "gallery" && <Gallery />}
        {activeSection === "projects" && <Projects />}
        {activeSection === "resume" && <Resume />}
        {activeSection === "contact" && <Contact />}

        {/* Stylish Footer Section */}
        <footer className="footer">
          <p>Crafted with ❤️ by Vaibhav Patil | © {new Date().getFullYear()}</p>
          <div className="social-icons">
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
        </footer>
      </div>
    </div>
  );
};

export default InfoPanel;
