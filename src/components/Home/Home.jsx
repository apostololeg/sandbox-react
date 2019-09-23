import { h } from 'preact'

import withTitle from 'components/HOC/withTitle'

function Home() {
  return (
    <h1>Home!</h1>
  );
}

export default withTitle('~/apostol')(Home);
