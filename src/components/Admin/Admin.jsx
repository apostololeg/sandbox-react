import { withStore } from 'justorm/preact';

import { Redirect } from 'components/Router';
import { Title } from 'components/Header';
import Flex from 'components/UI/Flex';

export default withStore({ user: ['isLogged'] })(function Admin({ store }) {
  const { isLogged } = store.user;

  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <Flex className="Admin">
      <Title text="Admin" />
      What's going on here?
    </Flex>
  );
});
