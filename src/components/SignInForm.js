import React, { useState, useEffect } from "react";
import emailService from "../services/Emailservice";
import countries from "./countries";
import "./SignInForm.css";

const SignInForm = ({ setShowDownload }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "Male",
    amountPaid: 200,
    position: "Pastor",
    country: "",
    town: "",
    mpesaMessage: "",
    whatsappNo: "",
    churchInstitution: "",
    systemDate: "",
    systemTime: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    setFormData((prevData) => ({
      ...prevData,
      systemDate: currentDate,
      systemTime: currentTime,
    }));
  }, []);

  const handleDownloadClick = () => {
    setShowDownload(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (duplicateWarning) setDuplicateWarning(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (formData.age > 100) newErrors.age = "Age cannot be above 100.";
    if (!formData.age) newErrors.age = "Age is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    setIsSubmitting(true);
    setDuplicateWarning(false);

    try {
      // Send email
      await emailService.sendEmail(formData);

      // Send to API
      const response = await fetch("https://regbackend-ofty.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("DUPLICATE");
        }
        throw new Error("Failed to register. Please try again.");
      }

      alert("Registration successful! Email sent & data stored.");

      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "Male",
        amountPaid: 200,
        position: "Pastor",
        country: "",
        town: "",
        mpesaMessage: "",
        whatsappNo: "",
        churchInstitution: "",
        systemDate: "",
        systemTime: "",
      });
    } catch (error) {
      if (error.message === "DUPLICATE") {
        setDuplicateWarning(true);
      } else {
        console.error("Error:", error);
        alert("Error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const particles = 20;
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.width = `${Math.random() * 20 + 5}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      document.body.appendChild(particle);
    }

    return () => {
      document.querySelectorAll('.particle').forEach(el => el.remove());
    };
  }, []);
  return (
    <div className="signin-container">
      <h2 className="conference-title">2025 R-Network Pastor's Conference</h2>
      <h3 className="conference-location">Kitale, Kenya</h3>
      <ul className="text">
        <li>Date: 24th - 25th April, 2025</li>
        <li>Venue: I.C.M Waterworks road, section six estate Kitale.</li>
        <li>Starting time: 9:00 AM - 4:00 PM daily</li>
      </ul>

      <div className="warning-note">
        <p>
          <strong>Important:</strong> Please ensure your credentials are unique. Duplicate entries will be rejected.
          After submission, please wait about 10 seconds for verification. You'll receive an alert confirming
          your registration status.
        </p>
      </div>

      {duplicateWarning && (
        <div className="duplicate-warning">
          <p>⚠️ Your information is already registered. Please check your email for confirmation or contact support if you believe this is an error.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required onChange={handleChange} value={formData.name} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required onChange={handleChange} value={formData.email} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" id="age" required onChange={handleChange} value={formData.age} />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" required onChange={handleChange} value={formData.gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="churchInstitution">Church/Organization/Institution:</label>
          <input
            type="text"
            name="churchInstitution"
            id="churchInstitution"
            required
            onChange={handleChange}
            value={formData.churchInstitution}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <select name="position" id="position" required onChange={handleChange} value={formData.position}>
            <option value="Bishop">Bishop</option>
            <option value="Pastor">Pastor</option>
            <option value="Leader">Church Leader</option>
            <option value="CU Leader">CU Leader</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select name="country" id="country" required onChange={handleChange} value={formData.country}>
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="town">Town:</label>
          <input type="text" name="town" id="town" required onChange={handleChange} value={formData.town} />
        </div>
        <div className="form-group">
          <label htmlFor="mpesaMessage">MPesa Message:</label>
          <textarea name="mpesaMessage" id="mpesaMessage" required onChange={handleChange} value={formData.mpesaMessage} />
        </div>
        <div className="form-group">
          <label htmlFor="whatsappNo">WhatsApp Number:</label>
          <input type="text" name="whatsappNo" id="whatsappNo" required onChange={handleChange} value={formData.whatsappNo} />
        </div>
        <div className="form-group">
          <label htmlFor="amountPaid">Amount Paid:</label>
          <input type="number" name="amountPaid" id="amountPaid" value={formData.amountPaid} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="systemDate"> Date:</label>
          <input type="text" name="systemDate" id="systemDate" value={formData.systemDate} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="systemTime"> Time:</label>
          <input type="text" name="systemTime" id="systemTime" value={formData.systemTime} readOnly />
        </div>
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? 'Processing...' : 'Register'}
        </button>
        <button type="button" onClick={handleDownloadClick} className="download-btn">
          Download Conference Materials
        </button>
      </form>
    </div>
  );
};

export default SignInForm;