const emailService = {
  sendEmail: async (data) => {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const timeString = currentDate.toLocaleTimeString();

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
      date: dateString,
      time: timeString,
    };

    console.log("🔥 [Frontend] Template Params Being Sent:", templateParams);

    try {
      const response = await fetch('https://regformbackend1.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

      console.log("📨 [Frontend] Fetch Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ [Frontend] Response not OK:", errorText);
        throw new Error("Failed to send email");
      }

      const result = await response.json();
      console.log("✅ [Frontend] Email sent successfully:", result);
    } catch (error) {
      console.error("🚨 [Frontend] Error caught:", error);
      throw new Error("Email sending failed: " + (error.message || "Unknown error"));
    }
  },
};

export default emailService;
