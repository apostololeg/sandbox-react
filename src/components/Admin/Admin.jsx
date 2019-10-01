import { h } from 'preact'
import { view } from 'preact-easy-state'

import userStore from 'store/user'

import { Redirect } from 'components/Router'
import { Title } from 'components/Header'
import Flex from 'components/UI/Flex'

function Admin() {
  if (!userStore.isLogged) {
    return <Redirect to="/login"/>
  }

  return (
    <Flex className="Admin">
      <Title text="Admin"/>
      What's going on here?
    </Flex>
  );
}

export default view(Admin);
