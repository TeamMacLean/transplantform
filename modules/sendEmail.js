// // TODO
// function trueSendEmail(form) {
//     return new Promise((resolve, reject) => {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: '',
//                 pass: '',
//             },
//         });
//         const mailOptions = {
//             from: 'SL-TC@nbi.ac.uk',
//             to: (form.singatoriesObj.username + '@nbi.ac.uk'),
//             cc: (form.singatoriesObj.researchAssistantUsername + '@nbi.ac.uk'),
//             subject: 'New Request for Plant Tissue Culture Service - Approval Required',
//             text: `
//                 Dear Group Leader,\n
//                 \n
//                 A new form has been submitted by a member of your group. Please approve or deny by heading to this link:\n
//                 \n
//                 https://transplant.tsl.ac.uk/form?id=${form.id}\n
//                 \n
//                 Regards,\n
//                 \n
//                 The Plant Tissue Culture Service Team
//             `,
//         };
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(info);
//             }
//         });
//     }
// };

const sendEmail = (form) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

export default sendEmail;
