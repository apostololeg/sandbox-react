import ROLES from './roles';

export default function(user, ...roles) {
  if (!user) {
    return false
  }

  return [ROLES.ADMIN, ...roles].some(role => user.roles.includes(role))
}
