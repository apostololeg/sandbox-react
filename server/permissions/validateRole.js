export default function(user, ...roles) {
  return ['ADMIN', ...roles].some(role => user.roles.includes(role)
}
