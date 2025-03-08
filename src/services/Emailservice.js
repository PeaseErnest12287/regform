import emailjs from "emailjs-com";

const emailService = {
  sendEmail: async (data) => {
    const templateParams = {
      from_name: data.name,
      to_email: data.email, // Send to the inputted email
      user_age: data.age,
      user_gender: data.gender,
      user_position: data.position, // Include position
      user_country: data.country, // Include country
      user_town: data.town, // Include town
      amount_paid: data.amountPaid,
      mpesa_message: data.mpesaMessage, // Include MPesa message
      whatsapp_no: data.whatsappNo, // Include WhatsApp number
    };

    try {
      await emailjs.send(
        "pease12287", // Your EmailJS service ID
        "template_bi7p28p", // Your EmailJS template ID
        templateParams,
        "sIZC-CiS5Pb2q4aE9" // Your EmailJS user ID
      );
    } catch (error) {
      throw new Error("Email sending failed: " + error.message);
    }
  },
};

export default emailService;
