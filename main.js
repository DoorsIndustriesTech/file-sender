const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(__dirname));

const upload = multer();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send", upload.array("files"), async (req, res) => {
  try {
    const description = req.body.description;

    const attachments = (req.files || []).map(file => ({
      filename: file.originalname,
      content: file.buffer.toString("base64") // 🔥 required
    }));

    await resend.emails.send({
      from: "onboarding@resend.dev", // change later to your domain
      to: "doorsindustries@gmail.com",
      subject: "Files From Website",
      text: description || "No description",
      attachments: attachments
    });

    res.send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email");
  }
});

// app.post("/send", upload.array("files"), async (req, res) => {
	// try {
	// 	const description = req.body.description;

	// 	const transporter = nodemailer.createTransport({
	// 		// service: "gmail",
	// 		host: "smtp.gmail.com",
	// 			port: 587,          // 🔥 use 587 instead of 465
	// 			secure: false, 
	// 		auth: {
	// 			user: process.env.EMAIL_USER,
	// 			pass: process.env.EMAIL_PASS
	// 		},
	// 		tls: {
	// 			rejectUnauthorized: false
	// 		}
	// 	});

	// 	const attachments = (req.files || []).map(file => ({
	// 		filename: file.originalname,
	// 		content: file.buffer
	// 	}));

	// 	await transporter.sendMail({
	// 		from: process.env.EMAIL_USER,
	// 		to: "jeankrlo.2000@hotmail.com",
	// 		subject: "Files From Website",
	// 		text: description,
	// 		attachments
	// 	});

	// 	res.send("Email sent");
	// } catch (err) {
	// 	console.error(err);
	// 	res.status(500).send("Error sending email");
	// }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));