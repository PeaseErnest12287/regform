const emailService = {
  sendEmail: async (data) => {
    // Get the current date and time
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString(); // Format date (you can customize this)
    const timeString = currentDate.toLocaleTimeString(); // Format time

    // Prepare the email template parameters
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
      date: dateString, // Add the date to the email
      time: timeString, // Add the time to the email
    };

    console.log("Template Params:", templateParams); // Log for debugging

    try {
      // Sending data to your backend API which will handle sending the email via Nodemailer
      const response = await fetch('https://regformbackend1.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const result = await response.json();
      console.log("Email sent successfully:", result); // Log success message
    } catch (error) {
      console.error("Error:", error); // Log the error object
      throw new Error("Email sending failed: " + (error.message || "Unknown error"));
    }
  },
};

export default emailService;
