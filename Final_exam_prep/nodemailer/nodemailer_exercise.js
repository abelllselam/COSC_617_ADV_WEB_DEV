const nodemailer = require("nodemailer");

async function sendMail() {
  let testAccount = await nodemailer.createTestAccount();
  console.log("Ethereal account credentials:");
  console.log("Host: ", testAccount.smtp.host);
  console.log("Port: ", testAccount.smtp.port);
  console.log("Secure: ", testAccount.smtp.secure);
  console.log("User: ", testAccount.user);
  console.log("Pass: ", testAccount.pass);

  let transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //define the email
  let info = await transporter.sendMail({
    from: `"Test sender" <${testAccount.user}>`,
    to: testAccount.user,
    subject: "Hello from the final exam prep",
    text: "This is just the body of the email.",
    html: "<b>This is an HTML body from Exam sample</b>",
  });

  console.log(
    "message sent! preview url: ",
    nodemailer.getTestMessageUrl(info)
  );
}
sendMail().catch(console.error);
