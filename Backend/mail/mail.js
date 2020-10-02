//External Imports
const ejs = require("ejs");

//Internal Imports
const fs = require("fs");

//Custom Imports
const mailer = require('./config');


let renderTemplate = (templatePath, placeholder) => {
    let compiled = ejs.compile(fs.readFileSync(templatePath, 'utf8'));
    return compiled(placeholder);
};

exports.sendOrderMail = (detail) => {
    console.log(__dirname)
    let template = `${__dirname}/template.ejs`;

    let html = renderTemplate(template, detail);

    let mailOptions = {
        from: "cook and cookies",
        to: detail.invoice_to_email,
        subject: "Order Invoice",
        html: html,
    };

    mailer.transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Success")
        }
    })
}
