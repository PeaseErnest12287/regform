import React, { useState } from "react";
import emailService from "../services/Emailservice";
import countries from "./countries"; // Import the countries array
import "./SignInForm.css"; // Assuming you have some CSS for styling

const SignInForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "Male", // Default gender
    amountPaid: 200, // Default amount paid
    position: "Pastor", // Default position
    country: "", // Selected country
    town: "", // User input for town
    mpesaMessage: "", // For storing the MPesa message
    whatsappNo: "", // For storing WhatsApp number
  });

  const [errors, setErrors] = useState({}); // State for error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      setErrors({}); // Clear errors if validation passes
    }

    try {
      await emailService.sendEmail(formData);
      alert("Registration email sent successfully!");

      // Clear the form after submission
      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "Male", // Reset to default
        amountPaid: 200, // Reset to default
        position: "Pastor", // Reset to default
        country: "", // Reset to default
        town: "", // Reset to default
        mpesaMessage: "", // Clear MPesa message
        whatsappNo: "", // Clear WhatsApp number
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="conference-title">2025 R-Network Pastor's Conference</h2>
      <h3 className="conference-location">Kitale, Kenya</h3>
      <ul>
        <li>Date: 25th - 26th April, 2025</li>
        <li>Venue: I.C.M Waterworks road, section six estate Kitale.</li>
        <li>Starting time: 9:00 AM - 4:00 PM daily</li>
      </ul>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Your Age"
            required
            onChange={handleChange}
            value={formData.age}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            required
            onChange={handleChange}
            value={formData.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <select
            name="position"
            id="position"
            required
            onChange={handleChange}
            value={formData.position}
          >
            <option value="Pastor">Pastor</option>
            <option value="Bishop">Bishop</option>
            <option value="Evangelist">Evangelist</option>
          </select>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            name="country"
            id="country"
            required
            onChange={handleChange}
            value={formData.country}
          >
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="town">Town:</label>
          <input
            type="text"
            name="town"
            id="town"
            placeholder="Enter your town"
            required
            onChange={handleChange}
            value={formData.town}
          />
        </div>
        <div>
          <label htmlFor="mpesaMessage">MPesa Message:</label>
          <textarea
            name="mpesaMessage"
            id="mpesaMessage"
            placeholder="Enter the MPesa transaction message"
            required
            onChange={handleChange}
            value={formData.mpesaMessage}
          />
        </div>
        <div>
          <label htmlFor="whatsappNo">WhatsApp Number:</label>
          <input
            type="text"
            name="whatsappNo"
            id="whatsappNo"
            placeholder="Enter your WhatsApp number"
            required
            onChange={handleChange}
            value={formData.whatsappNo}
          />
        </div>
        <div>
          <label htmlFor="amountPaid">Amount Paid:</label>
          <input
            type="number"
            name="amountPaid"
            id="amountPaid"
            value={formData.amountPaid}
            readOnly
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignInForm;
