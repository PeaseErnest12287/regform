import emailjs from "emailjs-com";

const emailService = {
  sendEmail: async (data) => {
    const templateParams = {
      from_name: data.name,
      to_email: data.email,
      user_age: data.age,
      user_gender: data.gender,
      user_position: data.position,
      user_country: data.country,
      user_town: data.town,
      amount_paid: data.amountPaid,
      mpesa_message: data.mpesaMessage,
      whatsapp_no: data.whatsappNo,
    };

    console.log("Template Params:", templateParams); // Log for debugging

    try {
      await emailjs.send(
        "service_icc2fbw", // Your EmailJS service ID
        "template_0zljxic", // Your EmailJS template ID
        templateParams,
        "x9a7g3CaO22WiSR4b" // Your EmailJS user ID
      );
      console.log("Email sent successfully!"); // Log success message
    } catch (error) {
      console.error("EmailJS Error:", error); // Log the full error object
      throw new Error("Email sending failed: " + (error.text || error.message || "Unknown error"));
    }
  },
};

export default emailService;