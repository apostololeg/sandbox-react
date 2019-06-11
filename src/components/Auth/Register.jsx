import * as Yup from 'yup';
import { register } from 'store/user';

function Register({ children }) {
  return children({
    title: 'Registration',
    titleLink: {
      text: 'Sign in',
      to: '/login',
    },
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchemaObj: {
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string().test(
        'match-password',
        'Passwords must match',
        function testConfirmPassword(value) {
          return this.parent.password === value;
        },
      )
    },
    fields: [
      {
        name: 'email',
        label: 'Email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
      },
      {
        name: 'confirmPassword',
        label: 'Confirm password',
        type: 'password',
      },
    ],
    submitText: 'Register',
    onSubmit: ({ email, password }) => register({ email, password }),
  });
}

export default Register;
