import { h } from 'preact'
import withTitle from 'components/HOC/withTitle'

function Profile() {
  return "Your profile";
}

export default withTitle('Profile')(Profile);
