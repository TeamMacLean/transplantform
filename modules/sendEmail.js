'use strict';
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
import getEmailOptions from './getEmailOptions';
dotenv.config();

const { SMTP_HOST, SMTP_PORT, ADMIN_GROUP_EMAIL } = process.env;

/**
 * actualSending
 * @param {Object} mailObj - Email meta data and body
 * @param {String} from - Email address of the sender
 * @param {Array} recipients - Array of recipients email address
 * @param {String} subject - Subject of the email
 * @param {String} message - message
 */
const sendEmail = async (mailObj) => {
  const { to, cc, subject, html } = mailObj;

  if (!to || !subject || !html) {
    throw new Error('Missing required fields in the mailObj');
  }

  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      // auth: {
      //   user: "hello@schadokar.dev",
      //   pass: "SMTP-KEY",
      // },
      //connectionTimeout: 10000,
    });
    // console.log('about to send message', mailObj);
    // send mail with defined transport object
    let mailStatus = await transporter.sendMail({
      from: 'TSL Transplant Website transplant@nbi.ac.uk', // sender address
      replyTo: ADMIN_GROUP_EMAIL,
      to: to, // list of recipients
      cc: cc, // list of additional recipients
      subject: subject, // Subject line
      html: html, // plain text
    });
    const betterMailStatus = {
      ...mailStatus.envelope,
    };
    if (mailStatus.accepted.length) {
      betterMailStatus.accepted = mailStatus.accepted;
    }
    if (mailStatus.rejected.length) {
      betterMailStatus.rejected = mailStatus.rejected;
    }
    console.log('Message sent:', betterMailStatus);
    return `Message sent: ${mailStatus.messageId}`;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendMail method. Error: ${error.message}`
    );
  }
};

export default sendEmail;
