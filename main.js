const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors({
	origin: "http://127.0.0.1:5500"
}));

const upload = multer(); // memory only (NO saving)

app.post("/send", upload.array("files"), async (req, res) => {

	const description = req.body.description;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
		user: "jeancarlo2451@gmail.com",
		pass: "dwgf njwd qqoc phen"
		}
	});

	const attachments = req.files.map(file => ({
		filename: file.originalname,
		content: file.buffer
	}));

	await transporter.sendMail({
		from: "jeancarlo2451@gmail.com",
		to: "jeankrlo.2000@hotmail.com",
		subject: "Files From Website",
		text: description,
		attachments
	});

	res.send("Email sent");
});

app.listen(3000, () => console.log("Server running"));