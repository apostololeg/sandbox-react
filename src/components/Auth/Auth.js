import { h, Component, Fragment } from 'preact'
import { bind } from 'decko'

import { capitalize } from 'tools/string'

import { notify } from 'store/notifications'
import PageStore from 'store/page'

import { Title } from 'components/Header'
import { Link } from 'components/Router'
import Flex from 'components/UI/Flex'
import Form, { SubmitButtons } from 'components/UI/Form'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

import s from './Auth.styl'

const Forms = {
  Login,
  Logout,
  Register
};

class Auth extends Component {
  componentDidMount() {
    PageStore.isAuth = true;
  }

  componentWillUnmount() {
    PageStore.isAuth = false;
  }

  @bind
  async onSubmit(onSubmit, payload) {
    const { route } = this.props;

    try {
      await onSubmit(payload);
      route.navigate('/');
    } catch(err) {
      notify({
        type: 'error',
        title: 'Login',
        content: err.message
      });
    }
  }

  @bind
  renderAuthForm({
    title,
    titleContent,
    titleLink,
    fields,
    footerContent,
    submitText,
    onSubmit,
    ...formProps
  }) {
    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2>{title}</h2>
          {titleContent}
          {titleLink && (
            <Link href={titleLink.to} className={s.link}>
              {titleLink.text}
            </Link>
          )}
        </div>
        <Form
          className={s.form}
          onSubmit={payload => this.onSubmit(onSubmit, payload)}
          {...formProps}
        >
          {({ Field, isValid, isDirty }) => (
            <Fragment>
              {fields.map(props => <Field {...props} key={props.name} />)}
              <div className={s.footer}>
                {footerContent}
                <div className={s.gap} />
                <SubmitButtons
                  buttons={[
                    {
                      text: submitText,
                      type: 'submit',
                      disabled: !isDirty || !isValid
                    },
                  ]}
                />
              </div>
            </Fragment>
          )}
        </Form>
      </div>
    );
  }

  render() {
    const { type } = this.props;
    const AuthForm = Forms[capitalize(type)];

    return (
      <Flex centered scrolled>
        <Title text="Auth" />
        <AuthForm>{this.renderAuthForm}</AuthForm>
      </Flex>
    );
  }
}

export default Auth;
