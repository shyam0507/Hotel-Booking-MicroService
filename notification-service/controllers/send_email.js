"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(toEmail, bookingID, propertyName, checkIn, checkOut) {
    try {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'shyam0507bb@gmail.com', // generated ethereal user
                pass: 'Shyam@2511' // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Booking Microservices <no-reply@booking.com>', // sender address
            to: toEmail, // list of receivers
            subject: "Booking Confirmed For " + propertyName, // Subject line
            // text: "Hello world?", // plain text body
            html: "<b>Hi Dear </b> <p>Your booking for Hotel " + propertyName + " with Booking id " + bookingID + " is confirm with checkin date " + checkIn + " and checkout date " + checkOut + ".</p> <h5>Team, </h5><h5>Booking App</h5>" // html body
        });

        console.log("Message sent: %s", info);
    } catch (error) {
        console.log("Message sent Error: %s", error);
    }
}

// sendEmail('shyam432168@gmail.com', '123', 'Radison Blue', '10-02-2020', '12-02-2020').catch(console.error);

module.exports = sendEmail;
