import { useState } from 'react';

import { signInWithGooglePopup, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.util';
import Button, { BUTTON_TYPES } from '../../components/button/button.component';
import FormInput from '../form-input/form-input.component';

import { SignInButtonsContainer, SignInContainer } from './sign-in-form.styles'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // accessing the current user sign in status setter

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    }
    catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email, please check spelling or sign up');
          break;
        default:
          console.log(`Error occurred: ${error.message}`)
          break;
      }
    }
  }

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign-in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email" type="email" required onChange={handleChange} name="email" value={email}
        />

        <FormInput
          label="Password" type="password" required onChange={handleChange} name="password" value={password}
        />
        <SignInButtonsContainer>
          <Button type='submit' children='Sign In' />
          <Button type='button' onClick={signInWithGoogle} children='Sign in with Google' buttonType={BUTTON_TYPES.google} />
        </SignInButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm

