import { h } from 'preact'
import withTitle from 'components/HOC/withTitle'

function Profile() {
  return (
    <h1>Profile!</h1>
    // TODO: profile edit form
  );
}

export default withTitle('Profile')(Profile);
