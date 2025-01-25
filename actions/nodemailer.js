"use server";

import nodemailer from "nodemailer";

export async function sendEmail({ name, surname, email, phoneNumber, message }) {
  if (!name || !surname || !email || !phoneNumber || !message) {
    return { success: false, error: 0 };
  }

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name} ${surname} - ${email}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `AB WEB FORMULÁŘ - ${name}, ${surname}`,
      text: `Nový kontakt skrze formulář:\n\nJméno: ${name}\nPříjmení: ${surname}\nE-mail: ${email}\nTel. číslo: ${phoneNumber}\n\nZpráva: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: 1 };
  }
}