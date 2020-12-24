import { hot } from 'react-hot-loader/root';

import Time from 'timen';
import { Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { createStore, withStore } from 'justorm/preact';

// import { Button } from 'ui-components';
// console.log('Button', Button);

// export default () => '123';

createStore('app', {
  count: 0,
});

@withStore('app')
class Test extends Component {
  render() {
    const { app } = this.props.store;
    window.store = app;
    const { count } = app;
    return <button onClick={() => app.count++}>AAAAAAAAAA {count}</button>;
  }
}

function App() {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    Time.after(5000, () => setVisible(false));
  });

  return isVisible && <Test />;
}

export default App;

// import 'store';

// import Flex from 'components/UI/Flex';
// import Container from 'components/UI/Container';
// import Notifications from 'components/UI/Notifications';

// import Routes from 'components/Routes';
// import Header from 'components/Header';

// import s from './App.styl';

// const App = () => (
//   <Flex className={s.root}>
//     <Header className={s.header} />
//     <Container className={s.content} vertical>
//       <Routes />
//     </Container>
//     <Notifications />
//   </Flex>
// );

// export default (PRODUCTION ? App : hot(App));
