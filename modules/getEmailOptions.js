const { DIVERT_EMAILS_USERNAME, ADMIN_GROUP_EMAIL } = process.env;

// TODO get domain (transplant.tsl.ac.uk) from .env or calculated

const adminEmailString = `${
  DIVERT_EMAILS_USERNAME ? DIVERT_EMAILS_USERNAME + '+' : ''
}${ADMIN_GROUP_EMAIL}@nbi.ac.uk`;

const getEmailFromUsername = (username) =>
  `${
    DIVERT_EMAILS_USERNAME ? DIVERT_EMAILS_USERNAME + '+' : ''
  }${username}@nbi.ac.uk`;

const getApprovalOptions = (form) => {
  const { trfId, signatoryObj } = form;

  const signatoryEmail = getEmailFromUsername(signatoryObj.username);

  // check this works
  const researchAssistantsEmailArr = signatoryObj.researchAssistants
    .map((ra) => getEmailFromUsername(ra))
    .flat();

  return {
    to: signatoryEmail,
    cc: researchAssistantsEmailArr,
    subject: `New Request #${trfId} for Plant Tissue Culture Service - Approval Required`,
    text: `Dear Group Leader,\n
      \n
      A new form has been submitted by a member of your group. Please approve or deny by heading to this link (N.B., you must be connected to NBI network to access this):\n
      \n
      https://transplant.tsl.ac.uk/form?id=${trfId}\n
      \n
      Regards,\n
      \n
      The Plant Tissue Culture Service Team`,
    html: `<div>
        <p>Dear Group Leader,</p>
        <p>A new form has been submitted by a member of your group. Please approve or deny by heading to this link (N.B., you must be connected to NBI network to access this):</p>
        <p><a href="https://transplant.tsl.ac.uk/form?id=${trfId}">https://transplant.tsl.ac.uk/form?id=${trfId}</a></p> 
        <p>Regards,</p>
        <p>The Plant Tissue Culture Service Team</p>
      </div>`,
  };
};

const getInProgressOptions = (form) => {
  const { trfId } = form;

  return {
    to: adminEmailString,
    subject: `Request #${trfId} 'In Progress' for Plant Tissue Culture Service - Printout Available`,
    text: `Dear Plant Tissue Culture Service Team,\n
      \n
      A form has been set in progress by a member of your team. Please find a printable version of the form by heading to this link (N.B., you must be connected to NBI network to access this):\n
      \n
      https://transplant.tsl.ac.uk/form?id=${trfId}\n
      \n
      Regards,\n
      \n
      Transplant Website`,
    html: `<div>
        <p>Dear Plant Tissue Culture Service Team,</p>
        <p>A form has been set to 'In Progress' by a member of your team. Please find a printable version of the form by heading to this link (N.B., you must be connected to NBI network to access this):</p>
        <p><a href="https://transplant.tsl.ac.uk/form?id=${trfId}">https://transplant.tsl.ac.uk/form?id=${trfId}</a></p> 
        <p>Regards,</p>
        <p>Transplant Website</p>
      </div>`,
  };
};

const getDeletionOptions = (form) => {
  const { trfId, signatoryObj, username } = form;

  const ccArray = [
    getEmailFromUsername(signatoryObj.username),
    adminEmailString,
  ].flat();

  return {
    to: getEmailFromUsername(username),
    cc: ccArray,
    subject: `Request #${trfId} DELETED from Plant Tissue Culture Service`,
    text: `Dear User,\n
      \n
      Your request has been deleted. You can still view the deleted request at this link (N.B., you must be connected to NBI network to access this):\n
      \n
      https://transplant.tsl.ac.uk/form?id=${trfId}\n
      \n
      If you think this was in error, then please get in touch with us or start this process again.\n
      \n
      Regards,\n
      \n
      The Plant Tissue Culture Service Team`,
    html: `<div>
        <p>Dear User,</p>
        <p>Your request has been deleted. You can still view the deleted request at this link (N.B., you must be connected to NBI network to access this):</p>
        <p><a href="https://transplant.tsl.ac.uk/form?id=${trfId}">https://transplant.tsl.ac.uk/form?id=${trfId}</a></p> 
        <p>If you think this was in error, then please get in touch with us or start this process again.</p>
        <p>Regards,</p>
        <p>The Plant Tissue Culture Service Team</p>
      </div>`,
  };
};
const getCompletedOptions = (form) => {
  const { trfId, username, completedMsg } = form;

  const additionalMsgTextStr = completedMsg
    ? `The Plant Tissue Culture Service Team adds the following note to your completed request:\n
    \n
    "${completedMsg}"\n
    \n`
    : '';

  const additionalMsgHtmlStr = completedMsg
    ? `<p>The Plant Tissue Culture Service Team adds the following note to your completed request:</p>
    <p><i>"${completedMsg}"</i></p>`
    : '';

  return {
    to: getEmailFromUsername(username),
    subject: `Request #${trfId} COMPLETED from Plant Tissue Culture Service`,
    text: `Dear User,\n
      \n
      Your request has been completed. You can still view the request at this link (N.B., you must be connected to NBI network to access this):\n
      \n
      <p><a href="https://transplant.tsl.ac.uk/form?id=${trfId}">https://transplant.tsl.ac.uk/form?id=${trfId}</a></p> 
      \n
      ${additionalMsgTextStr}
      If you have any questions or problems, then please get in touch with us.\n
      \n
      Regards,\n
      \n
      The Plant Tissue Culture Service Team`,
    html: `<div>
        <p>Dear User,</p>
        <p>Your request has been completed. You can still view its details at this link (N.B., you must be connected to NBI network to access this):</p>
        <p><a href="https://transplant.tsl.ac.uk/form?id=${trfId}">https://transplant.tsl.ac.uk/form?id=${trfId}</a></p> 
        ${additionalMsgHtmlStr}
        <p>If you have any questions or problems, then please get in touch with us.</p>
        <p>Regards,</p>
        <p>The Plant Tissue Culture Service Team</p>
      </div>`,
  };
};

const getEmailOptions = (strategy, form) => {
  switch (strategy) {
    // case 'test':
    //   return getTestOptions(form);
    case 'approval':
      return getApprovalOptions(form);
    case 'deletion':
      return getDeletionOptions(form);
    case 'in progress':
      return getInProgressOptions(form);
    case 'completed':
      return getCompletedOptions(form);
    default:
      return null;
  }
};

export default getEmailOptions;
