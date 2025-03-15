import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Terminal from "./Terminal/Terminal";
import InfoPanel from "./Panel/Panel";
import MobileView from "./MobileView/MobileView";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("home"); // Track active section
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust width threshold as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="app">
      {isMobile ? (
        <MobileView />
      ) : (
        <>
          <Navbar setActiveSection={setActiveSection} />
          <div className="terminal">
            <Terminal />
          </div>
          <div className="panel">
            <InfoPanel activeSection={activeSection} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
