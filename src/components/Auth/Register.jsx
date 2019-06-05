import * as Yup from 'yup';
import { register } from 'store/user';

function Register({ children }) {
  return children({
    formRef: form => this.form = form,
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
      email: Yup.string().min(3).required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string().test(
        'match-password',
        'Passwords must match',
        value => this.form.values.password === value,
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
    onSubmit: register,
  });
}

export default Register;
