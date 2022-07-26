export default function ({ $auth }) {
  if (!$auth || !$auth.user || !$auth.user.username) {
    return;
  }

  const user = $auth.user;

  return {
    username: user.username,
    // user: user,
  };
}
