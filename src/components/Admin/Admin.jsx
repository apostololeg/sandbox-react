import { h } from 'preact'
import { view } from 'preact-easy-state'

import userStore from 'store/user'

import withTitle from 'components/HOC/withTitle'
import { Redirect } from 'components/Router'
import Flex from 'components/UI/Flex'

function Admin() {
  if (!userStore.isLogged) {
    return <Redirect to="/login"/>
  }

  return (
    <Flex className="Admin">
      What's going on here?
    </Flex>
  );
}

export default withTitle('Admin')(view(Admin));
