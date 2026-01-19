import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,    // Use 465 for secure connections
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});