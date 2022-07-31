const adminEmailString = 'SL-TC@nbi.ac.uk';

const getApprovalOptions = (form) => {
  const { id, signatoryObj } = form;

  // check this works
  const researchAssistantsEmailArr = signatoryObj.researchAssistants.map(
    (ra) => `${ra}@nbi.ac.uk`
  );

  return {
    to: signatoryObj.username + '@nbi.ac.uk',
    cc: researchAssistantsEmailArr,
    subject: `New Request #${id} for Plant Tissue Culture Service - Approval Required`,
    text: `
      Dear Group Leader,\n
      \n
      A new form has been submitted by a member of your group. Please approve or deny by heading to this link:\n
      \n
      https://transplant.tsl.ac.uk/form?id=${id}\n
      \n
      Regards,\n
      \n
      The Plant Tissue Culture Service Team
    `,
  };
};

const getInProgressOptions = (form) => {
  const { id } = form;

  // check this works
  const researchAssistantsEmailArr = form.signatoryObj.researchAssistants.map(
    (ra) => `${ra}@nbi.ac.uk`
  );

  return {
    to: adminEmailString,
    subject: `Request #${form.id} in progress for Plant Tissue Culture Service - printout available`,
    text: `
      Dear Plant Tissue Culture Service Team Member,\n
      \n
      A form has been set in progress by a member of your team. Please find a printable version of the form by heading to this link:\n
      \n
      https://transplant.tsl.ac.uk/form?id=${id}\n
      \n
      Regards,\n
      \n
      The Plant Tissue Culture Service Team
    `,
  };
};

const getDeletionOptions = (form) => {
  const { id, signatoryObj, username } = form;

  const ccArray = [`${signatoryObj.username}@nbi.ac.uk`, adminEmailString];

  return {
    to: username + '@nbi.ac.uk',
    cc: ccArray,
    subject: `Request #${id} DELETED from Plant Tissue Culture Service`,
    text: `
      Dear User,\n
      \n
      Your request has been deleted. You can still view the deleted request here:\n
      \n
      https://transplant.tsl.ac.uk/form?id=${id}\n
      \n
      If you think this was in error, then please get in touch with us or start this process again.\n
      \n
      Regards,\n
      \n
      The Plant Tissue Culture Service Team
    `,
  };
};
const getCompletedOptions = (form) => {
  const { id, username, completedMsg } = form;

  const completedMsgEmailStr = completedMsg
    ? `
    The Plant Tissue Culture Service Team adds the following note to your completed request:\n
    \n
    "${completedMsg}"\n
    \n
  `
    : '';

  return {
    to: username + '@nbi.ac.uk',
    subject: `Request #${id} COMPLETED from Plant Tissue Culture Service`,
    text: `
      Dear User,\n
      \n
      Your request has been completed. You can still view the deleted request here:\n
      \n
      https://transplant.tsl.ac.uk/form?id=${id}\n
      \n
      ${completedMsgEmailStr}
      If you have any questions or problems, then please get in touch with us.\n
      \n
      Regards,\n
      \n
      The Plant Tissue Culture Service Team
    `,
  };
};

const getMutatableOptions = (strategy, form) => {
  switch (strategy) {
    case 'approval':
      return getApprovalOptions(form);
    case 'deletion':
      return getDeletionOptions(form);
    case 'in progress':
      return getInProgressOptions(form);
    case 'completed':
      return getCompletedOptions(form);
    default:
      return {};
  }
};

// TODO
const trueSendEmail = (strategy, form) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: '',
      },
    });
    const mutatableOptions = getMutatableOptions(strategy, form);
    const mailOptions = {
      from: adminEmailString,
      ...mutatableOptions,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

const sendEmail = (strategy, form) => {
  return new Promise((resolve, reject) => {
    trueSendEmail(strategy, form)
      .then((info) => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default sendEmail;