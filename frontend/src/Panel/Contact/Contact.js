import React, { useState } from 'react';
import axios from 'axios';
import { faGithub, faLinkedin, faTwitter, faDev, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Contact.css'; // Import CSS file

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await axios.post("http://localhost:5000/contact", { email, message });
      if (response.status === 201) {
        setFormStatus("success");
        setEmail("");
        setMessage("");
        setErrorMessage("");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="contact-container">
      <div className="form-card">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">We'd love to hear from you!</p>

        <form onSubmit={handleContactSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              maxLength="500"
              className="message-box"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>

          {formStatus === "loading" && <p className="status-message">Submitting...</p>}
          {formStatus === "success" && <p className="success-message">✅ Thank you! We've received your message.</p>}
          {formStatus === "error" && <p className="error-message">❌ Error: {errorMessage}</p>}
        </form>

        <div className="social-icons">
          <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faDev} /></a>
          <a href="#"><FontAwesomeIcon icon={faStackOverflow} /></a>
        </div>
      </div>
    </div>
  );
}
