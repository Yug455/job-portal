const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
   port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMailfun=async(to,subject,text,html)=>{
try {
  const info = await transporter.sendMail({
    from: 'jobsp374@gmail.com', // sender address
    to, // list of recipients
    subject, // subject line
    text, // plain text body
    html, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
  throw err;
}
}
module.exports=sendMailfun