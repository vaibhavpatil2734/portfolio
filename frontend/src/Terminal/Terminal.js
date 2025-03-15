import React, { useState, useRef, useEffect } from "react";
import "./Termianl.css";

const Terminal = () => {
  const [history, setHistory] = useState([]); // Command history
  const terminalRef = useRef(null); // Terminal container reference
  const inputRefs = useRef([]); // References for all input fields

  const username = "vaibhav";
  const hostname = "workbench";

  // Portfolio information to be shown when the 'about' command is triggered
  const aboutMessage =
    `#############################################################################
#                           WELCOME TO MY PORTFOLIO                         #      
#           A journey of learning, growth, and passion for technology       #       
#############################################################################
=============================================================================
#           I’m VAIBHAV PATIL, building tomorrow with code today.           #                     
=============================================================================
=============================================================================
#      "In the world of binary, every decision is either 0 or 1,and in      #
#    engineering, I always choose 1 because that's where progress starts."  #  
=============================================================================
-> EDUCATION: 
SSC: 81% (M.L.V. Dholgarwadi)
Diploma in CSE: 80% (Dr. D.Y. Patil Polytechnic, Kolhapur)
B-Tech in CSE: Pursuing (Ashokrao Mane Group of Institutions)

-> PASSIONS: 
Web Development (MERN Stack) | Cybersecurity Enthusiast | Hardware: Arduino Uno, ESP32
-----------------------------------------------------------------------------
!!! Type 'help' to see the available commands. !!!`;


const links = 
`-> GitHub: 
  https://github.com/vaibhavpatil2734
-> Instagram: 
  https://www.instagram.com/vaibhavpatil_2734?igsh=eGY4M2NxdnVmanBh
-> LinkedIn: 
  https://www.linkedin.com/in/vaibhav-patil-773987322/`

  const skills = 
  `-> Web Development: MERN Stack (MongoDB, Express, React, Node)
-> Hardware: Arduino, ESP32
-> Programming: Python, HTML, CSS, JavaScript
-> Database: MongoDB, MySQL
-> Cloud: AWS 
-> Version Control: Git, GitHub`

  // Mock command handler
  const handleCommand = (command) => {
    switch (command.trim().toLowerCase()) {
      case "help":
        return `Available commands:
        - skills: List of technical skills
        - links: Social media and coding platform links
        - contact: Contact information
        - clear: Clear the terminal
        - about: Info about the Admin`;
        
      case "clear":
        setHistory([]);
        return "";

      case "about":
        return aboutMessage; // Return the about message when 'about' command is called
      
      case "links":
        return links;

      case "skills":
        return skills;
      
      case "contact":
        return "->Email:\nvaibhavpatil.2734@gmail.com";

      case "":
        return ""; // Empty input does nothing

      default:
        return `Command not found: ${command}
                Type 'help' to see the available commands.`;
    }
  };

  // Handle input changes for a specific command prompt
  const handleInputChange = (index, value) => {
    setHistory((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, input: value } : entry
      )
    );
  };

  // Handle form submission for a specific command prompt
  const handleSubmit = (e, index) => {
    e.preventDefault();
    const trimmedInput = history[index]?.input.trim();
    if (trimmedInput) {
      const response = handleCommand(trimmedInput);
      setHistory((prev) => [
        ...prev.slice(0, index),
        {
          ...prev[index],
          output: response,
          completed: true, // Mark the command as completed
        },
        { input: "", completed: false }, // Add a new empty prompt
      ]);
    }
  };

  // Auto-scroll to the bottom of the terminal output
  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  // Focus the last input field when the terminal updates
  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[inputRefs.current.length - 1]?.focus();
    }
  }, [history]);

  // Initialize the terminal with one prompt and automatically simulate 'about' command execution
  useEffect(() => {
    // Automatically trigger the 'about' command after a brief delay, but don't add it twice
    const timeout = setTimeout(() => {
      setHistory((prevHistory) => [
        ...prevHistory,
        {
          input: "about",
          output: aboutMessage,
          completed: true,
        },
        { input: "", completed: false },
      ]);
    }, 500); // Delay for a smoother transition
    return () => clearTimeout(timeout); // Cleanup the timeout if the component unmounts
  }, []); // Empty de

  // Handle terminal click to focus on the last input
  const handleTerminalClick = () => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[inputRefs.current.length - 1]?.focus();
    }
  };

  return (
    <div
      className="terminal-container"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        color: "lime",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: "14px", // Decreased text size
        padding: "1rem",
        cursor: "text",
        boxSizing: "border-box",
        overflowX: "hidden", // Hide horizontal scrollbar
      }}
      ref={terminalRef}
      onClick={handleTerminalClick} // Add click handler
    >
      <div
        className="scrollbar"
        id="scrollbar1"
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto", // Ensure vertical scrolling
          wordWrap: "break-word", // Wrap text inside
        }}
      >
        {history.map((entry, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  color: "lime",
                  marginRight: "0.5rem",
                }}
              >
                {username}@{hostname}:~$
              </span>
              {entry.completed ? (
                <span>{entry.input}</span>
              ) : (
                <form
                  onSubmit={(e) => handleSubmit(e, index)}
                  style={{ flexGrow: 1 }}
                >
                  <input
                    type="text"
                    value={entry.input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    ref={(el) => (inputRefs.current[index] = el)} // Set input reference
                    style={{
                      width: "100%",
                      backgroundColor: "black",
                      color: "lime",
                      border: "none",
                      outline: "none",
                      fontFamily: "'Courier New', Courier, monospace",
                    }}
                    autoFocus={index === history.length - 1}
                  />
                </form>
              )}
            </div>
            {entry.output && (
              <div style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>
                {entry.output}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
