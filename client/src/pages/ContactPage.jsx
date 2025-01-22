import React from 'react';
import '../css/ContactForm.css'

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Have a question about your order? We'd love to hear from you.
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="visually-hidden">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Your Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="visually-hidden">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Email Address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="visually-hidden">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="form-input"
            placeholder="Subject"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="visually-hidden">
            Your Message
          </label>
          <textarea
            id="message"
            className="form-input textarea"
            rows="6"
            placeholder="Your Message"
          ></textarea>
        </div>

        <button type="submit" className="form-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
