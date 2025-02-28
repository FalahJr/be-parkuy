"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const sendEmail = async (email, link) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: '9156b1f532355f',
            pass: process.env.MAILTRAP_API_KEY,
        },
    });
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<b>Hello world?</b> <a href="${link}">confirm Email</a>`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=send-email.js.map