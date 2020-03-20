import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [form, setForm] = useState({
    fName: "",
    fNameError: "",
    lName: "",
    lNameError: "",
    email: "",
    emailError: "",
    content: "",
    contentError: "",
    subject: "",
    subjectError: "",
    submitted: false
  });
  const handleSubmit = () => {
    const errors = {
      fNameError: "",
      lNameError: "",
      emailError: "",
      contentError: "",
      subjectError: ""
    };
    console.log("SUBMITTING");
    if (form.fName.length < 2) {
      console.log("Adding first name error");
      // add first name error
      errors.fNameError = "djkfhaskjdhfklashdf";
    }
    if (form.lName.length < 2) {
      console.log("Adding last name error");
      // add last name error
      errors.lNameError = "asdjhfaskjhfkasjdfhlk";
    }
    setForm({ ...form, ...errors });
  };
  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <pre>{JSON.stringify(form)}</pre>
      <label>First Name:</label>
      <input
        className="input"
        onChange={e => setForm({ ...form, fName: e.target.value })}
        value={form.fName}
      />
      {/* 2 characters, capital letter, no numbers/symbols */}
      {form.fNameError && (
        <span className="red-text">Not long enough........</span>
      )}
      <label>Last Name:</label>
      <input
        className="input"
        onChange={e => setForm({ ...form, lName: e.target.value })}
        value={form.lName}
      />
      {form.lNameError && (
        <span className="red-text">Not long enough........</span>
      )}
      {/* 2 characters, capital letter, no numbers/symbols */}
      <label>Email:</label>
      <input
        className="input"
        onChange={e => setForm({ ...form, email: e.target.value })}
        value={form.email}
      />
      {/* valid email */}
      <label>Subject:</label>
      <input
        className="input"
        onChange={e => setForm({ ...form, subject: e.target.value })}
        value={form.subject}
      />
      {/* 2 characters */}

      <label>Body:</label>
      <textarea
        row="3"
        className="input"
        onChange={e => setForm({ ...form, content: e.target.value })}
        value={form.content}
      ></textarea>
      {/* min 200 characters */}
      {form.content.length < 200 && (
        <span className="red-text">
          Too short. Please provide a better description
        </span>
      )}
      {!form.fName.length > 0 &&
        !form.lName.length < 5 &&
        !form.content.length < 200 && (
          <button
            onClick={handleSubmit}
            className={form.submitted ? "loading btn primary" : "btn primary"}
          >
            <div className="spinner" />
            <p className="text">Submit</p>
          </button>
        )}
    </div>
  );
};

export default ContactForm;
