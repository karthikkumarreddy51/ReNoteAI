require('dotenv').config();
const nodemailer = require('nodemailer');
// ...existing code...

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // now 465 for secure connection
  secure: true, // true for port 465 (implicit TLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  requireTLS: true, // enforce TLS for STARTTLS connection
  tls: {
    rejectUnauthorized: false, // allow self-signed certificates if necessary
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Verification Error:', error);
  } else {
    console.log('SMTP server is ready to take messages');
  }
});

// ...existing code...
