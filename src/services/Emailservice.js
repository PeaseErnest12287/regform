import emailjs from 'emailjs-com';

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
      user_church: data.churchInstitution,
      user_town: data.town,
      amount_paid: data.amountPaid,
      mpesa_message: data.mpesaMessage,
      whatsapp_no: data.whatsappNo,
      date: dateString,
      time: timeString,
    };

    console.log("🔥 [Frontend] Template Params Being Sent:", templateParams);

    try {
      // First, try the custom API service
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

      // If the first attempt fails, fall back to EmailJS
      console.log("🔄 [Frontend] Falling back to EmailJS...");

      try {
        const emailJsResponse = await emailjs.send(
          'service_icc2fbw ',    // Your EmailJS service ID
          'template_0zljxi',   // Your EmailJS template ID
          templateParams,
          'x9a7g3CaO22WiSR4b'        // Your EmailJS user ID
        );

        console.log("✅ [Frontend] Email sent successfully via EmailJS:", emailJsResponse);
      } catch (emailJsError) {
        console.error("❌ [Frontend] Error while sending email via EmailJS:", emailJsError);
        throw new Error("Email sending failed on both services: " + (emailJsError.message || "Unknown error"));
      }
    }
  },
};

export default emailService;
