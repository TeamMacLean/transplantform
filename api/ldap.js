var LdapAuth = require('ldapauth-fork');
// require('dotenv').config();
// LDAP Connection Settings
const server = process.env.LDAP_URL; // 192.168.1.1
const bindDN = process.env.LDAP_BIND_DN; // Username
const bindCredentials = process.env.LDAP_BIND_CREDENTIALS; // User password
const bindSearchBase = process.env.LDAP_SEARCH_BASE; // test.com
const searchFilter = process.env.LDAP_SEARCH_FILTER;
const groupRequirement = process.env.LDAP_MUST_BE_MEMBER_OF;

function authenticate(username, password) {
  return new Promise((good, bad) => {

    const options = {
      url: server,
      bindDN: bindDN,
      bindCredentials: bindCredentials,
      searchBase: bindSearchBase,
      searchFilter: searchFilter
    };
    const auth = new LdapAuth(options);
    auth.authenticate(username, password, function (err, user) {

      auth.close(function () {
        // We don't care about the closing
      });

      if (err) {
        bad(err)
      } else {
        if (user) {
          //check for group if required

          if (groupRequirement && user.memberOf) {

            const groupOptions = groupRequirement.replace(' ', '').split(';');

            let isMember = false;
            user.memberOf.map(g => {
              groupOptions.map(go => {
                if (g.indexOf('CN=' + go) > -1) {
                  isMember = true;
                }
              })
            });

            if (isMember) {
              good(user);
            } else {
              console.log('AUTH', 'user not member of', ...groupOptions);
              bad(new Error('user not member of group'))
            }

          } else {
            good(user);
          }

        } else {
          bad(new Error('user not found'))
        }
      }
    });
    auth.once('error', function (err) {

    });
    auth.on('error', function () { /* Ignored */
    });
  })
}

module.exports = {authenticate};
