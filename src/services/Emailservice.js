import emailjs from 'emailjs-com';

// 🔑 Initialize EmailJS with your Public Key (once per app)
emailjs.init('x9a7g3CaO22WiSR4b'); // <-- 🔁 Replace with your real PUBLIC key

const emailService = {
  sendEmail: async (data) => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

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
      date,
      time,
    };

    console.log("🚀 [EMAILJS] Sending with params:", templateParams);

    try {
      const response = await emailjs.send(
        'service_icc2fbw',         // ✅ Your EmailJS Service ID
        'template_0zljxi',         // ✅ Your EmailJS Template ID
        templateParams,
        'x9a7g3CaO22WiSR4b'        // ✅ Your EmailJS Public Key
      );

      console.log("✅ [EMAILJS] Email sent successfully:", response);

      return {
        success: true,
        message: 'Email sent successfully via EmailJS.',
        response,
      };

    } catch (error) {
      console.error("❌ [EMAILJS] Email failed to send:", error);

      return {
        success: false,
        message: error?.text || 'Unknown error from EmailJS.',
        error,
      };
    }
  }
};

export default emailService;
