export default function(user, ...roles) {
  if (!user) {
    return false
  }

  return ['ADMIN', ...roles].some(role => user.roles.includes(role))
}
