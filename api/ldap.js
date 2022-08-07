var LdapAuth = require('ldapauth-fork');
// LDAP Connection Settings
const server = process.env.LDAP_URL; // 192.168.1.1
const bindDN = process.env.LDAP_BIND_DN; // Username
const bindCredentials = process.env.LDAP_BIND_CREDENTIALS; // User password
const bindSearchBase = process.env.LDAP_SEARCH_BASE; // test.com
const searchFilter = process.env.LDAP_SEARCH_FILTER;

function authenticate(username, password) {
  return new Promise((good, bad) => {
    const options = {
      url: server,
      bindDN: bindDN,
      bindCredentials: bindCredentials,
      searchBase: bindSearchBase,
      searchFilter: searchFilter,
    };
    const auth = new LdapAuth(options);
    auth.authenticate(username, password, (err, user) => {
      if (err) {
        bad(err);
      } else if (!user) {
        bad(new Error('User not found. Try refreshing the web app?'));
      } else {
        good(user);
      }
    });
    auth.close(() => {
      //console.log('ldap connection closed');
    });
    auth.once('error', (err) => {
      //console.log('ldap error: ' + err);
    });
    auth.on('error', () => {
      //console.log('ldap error');
    });
  });
}

module.exports = { authenticate };
