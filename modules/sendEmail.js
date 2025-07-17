'use strict';
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const { SMTP_HOST, SMTP_PORT, ADMIN_GROUP_EMAIL, DIVERT_EMAILS_USERNAME } =
  process.env;

const sendEmail = async (mailObj) => {
  const { to, cc, subject, html } = mailObj;

  if (!to || !subject || !html) {
    throw new Error('Missing required fields in the mailObj');
  }

  try {
    let transporter = nodemailer.createTransport(
      smtpTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        // Add other SMTP options here if necessary (e.g., secure, auth)
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      })
    );

    // console.log('about to send message', mailObj);

    const finalTo = Array.isArray(to) ? [...to] : [to];

    // tester+username@nbi.ac.uk is not sending, so directly add the tester's username
    if (DIVERT_EMAILS_USERNAME) {
      finalTo.push(`${DIVERT_EMAILS_USERNAME}@nbi.ac.uk`);
    }

    let mailOpts = {
      from: 'TSL Transplant Website tsl-transplant@nbi.ac.uk', // sender address
      replyTo: ADMIN_GROUP_EMAIL + '@nbi.ac.uk',
      to: finalTo, // list of recipients
      subject: subject, // Subject line
      html: html,
    };

    if (cc) {
      mailOpts.cc = cc;
    }

    let mailStatus = await transporter.sendMail(mailOpts);

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
