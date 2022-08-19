// react, redux
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// components
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// redux actions
import { signUpStart } from '../../store/user/user.action';
// styles
import { SignUpContainer } from './sign-up-form.styles'

// default sign up field state
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // to clear fields after success sign up
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  };

  // to create a new user from the sign up form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const passwordCheck = password === confirmPassword;
    console.log(passwordCheck)
    if (!passwordCheck) {
      alert('passwords does not math!');
      return;
    };

    try {
      dispatch(signUpStart(email, password))
      // const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // // user.displayName = displayName;

      // await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      alert("Congratulations, user is created successfully ")
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannon create user, email already in use')
      } else {
        console.log('Error occurred', error)
      };
    };
  };

  // handle sign up fields change
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name" type="text" required onChange={handleChange} name="displayName" value={displayName}
        />

        <FormInput
          label="Email" type="email" required onChange={handleChange} name="email" value={email}
        />

        <FormInput
          label="Password" type="password" required onChange={handleChange} name="password" value={password}
        />

        <FormInput
          label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}
        />
        <Button type="submit" children='Sign Up' />
      </form>
    </SignUpContainer>
  )
};

export default SignUpForm;