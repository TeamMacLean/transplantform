// TODO move to database (or hardcode until requested?)
export const getLdapGroups = () => [
  {
    name: 'Nick Talbot',
    username: 'talbotn',
    acceptableLdapGroupStrs: [],
    researchAssistants: ['melanie'],
  },
  {
    name: 'Jonathan Jones',
    username: 'jjones',
    acceptableLdapGroupStrs: [],
    researchAssistants: ['cassandra', 'aragorn'],
  },
];

const getAllSignatories = () =>
  getLdapGroups().map((group) => ({
    name: group.name,
    username: group.username,
  }));

const getSignatories = (memberOf) => {
  const signatories = [];
  memberOf.forEach((ldapGroupStr) => {
    getLdapGroups().forEach((ldapGroup) => {
      const alreadySignatoryUsernames = signatories.map(
        (signatory) => signatory.username
      );
      if (
        ldapGroup.acceptableLdapGroupStrs.includes(ldapGroupStr) &&
        !alreadySignatoryUsernames.includes(ldapGroup.username)
      ) {
        signatories.push({
          name: ldapGroup.name,
          username: ldapGroup.username,
          researchAssistants: ldapGroup.researchAssistants,
        });
      }
    });
  });
  return signatories;
};

const getIsGroupLeaderForObj = (username) => {
  const foundGroup = getLdapGroups().find(
    (group) => group.username === username
  );
  return foundGroup ? foundGroup : null;
};

const getIsResearchAssistantFor = (username) => {
  const foundGroup = getLdapGroups().find((group) => {
    return group.researchAssistants.includes(username);
  });
  return foundGroup ? foundGroup.username : null;
};

const getSignatoriesStrategy = (
  isGroupLeaderForObj,
  isResearchAssistantFor,
  userObj
) => {
  if (userObj.isAdmin) {
    return getAllSignatories();
  } else if (isResearchAssistantFor) {
    return getLdapGroups().find(
      (group) => isResearchAssistantFor === group.username
    );
  } else if (isGroupLeaderForObj) {
    return getLdapGroups().find(
      (group) => isGroupLeaderForObj.username === group.username
    );
  } else {
    getSignatories(userObj.memberOf);
  }
};

export const getUserInfo = (userObj) => {
  const isGroupLeaderForObj = getIsGroupLeaderForObj(userObj.username);
  const isResearchAssistantFor = getIsResearchAssistantFor(userObj.username);

  const signatories = getSignatoriesStrategy(
    isGroupLeaderForObj,
    isResearchAssistantFor,
    userObj
  );

  return {
    isGroupLeaderForObj: isGroupLeaderForObj,
    isResearchAssistantFor: isResearchAssistantFor,
    signatories: signatories,
  };
};