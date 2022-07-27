// TODO move to database (or hardcode until requested?)
const ldapGroups = [
    {
        name: 'Nick Talbot',
        username: 'talbotn',
        acceptableLdapGroupStrs: [],
        researchAssistantUsername: 'melanie'
    },
    {
        name: 'Jonathan Jones',
        username: 'jjones',
        acceptableLdapGroupStrs: [],
        researchAssistantUsername: 'cassandra'
    }
];

const getAllSignatories = () => ldapGroups.map(group => ({name: group.name, username: group.username}));

const getSignatories = memberOf => {
    const signatories = [];
    memberOf.forEach(ldapGroupStr => {
        ldapGroups.forEach(ldapGroup => {
            const alreadySignatoryUsernames = signatories.map(signatory => signatory.username);
            if (
                ldapGroup.acceptableLdapGroupStrs.includes(ldapGroupStr) && !alreadySignatoryUsernames.includes(ldapGroup.username)            
            ) {
                signatories.push({
                    name: ldapGroup.name,
                    username: ldapGroup.username
                });
            }
        });
    });
    return signatories;
}

const getIsGroupLeaderForObj = (username) => {
    const foundGroup = ldapGroups.find(group => group.username === username);
    return foundGroup ? foundGroup : null;
}

const getIsResearchAssistantFor = (username) => {
    const foundGroup = ldapGroups.find(group => group.researchAssistantUsername === username);
    return foundGroup ? foundGroup.researchAssistantUsername : null;
}

const getSignatoriesStrategy = (isGroupLeaderForObj, isResearchAssistantFor, userObj) => {

    if (userObj.isAdmin){
        return getAllSignatories();
    } else if (isResearchAssistantFor) {
        return ldapGroups.find(group => isResearchAssistantFor === group.username)
    } else if (isGroupLeaderForObj){
        return ldapGroups.find(group => isGroupLeaderForObj.username === group.username)
    } else {
        getSignatories(userObj.memberOf)
    }

}

export const getUserInfo = userObj => {

    const isGroupLeaderForObj = getIsGroupLeaderForObj(userObj.username);
    const isResearchAssistantFor = getIsResearchAssistantFor(userObj.username);

    const signatories = getSignatoriesStrategy(isGroupLeaderForObj, isResearchAssistantFor, userObj)

    return {
        isGroupLeaderForObj: isGroupLeaderForObj,
        isResearchAssistantFor: isResearchAssistantFor,
        signatories: signatories,         
    };
}



