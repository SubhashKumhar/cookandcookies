//External Imports
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 587,
    // ignoreTLS: false,
    // secure: false,
    service: "gmail",
    auth: {
        user: "kumarsatish9460@gmail.com",
        pass: "malamaal",
    },
  
});

module.exports = {
    nodemailer: nodemailer,
    transporter: transporter
}