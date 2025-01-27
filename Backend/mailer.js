const nodemailer = require("nodemailer");

// Configure transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adventurecrewt5@gmail.com", // Your email
    pass: "taddyeoarfmpafeb", // App-specific password
  },
});

// Function to send confirmation email
const sendConfirmationEmail = async (toEmail, fullName) => {
  try {
    const mailOptions = {
      from: "adventurecrewt5@gmail.com",
      to: toEmail,
      subject: "Registration Confirmation - TravelMate",
      html: `<p>Dear ${fullName},</p>
             <p>Thank you for registering on TravelMate! We're excited to have you on board.</p>
             <p>Your registration is confirmed. Start exploring amazing travel destinations now!</p>
             <p>Best regards,</p>
             <p>The TravelMate Team</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully!");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

// Function to send OTP email
const sendOtpEmail = async (toEmail, otp) => {
  try {
    const mailOptions = {
      from: "adventurecrewt5@gmail.com",
      to: toEmail,
      subject: "Your OTP for TravelMate",
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

module.exports = { sendConfirmationEmail, sendOtpEmail };
