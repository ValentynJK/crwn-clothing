import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import { useState } from 'react';

import Button from '../../components/button/button.component';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.util';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

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
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthWithEmailAndPassword(email, password);
      console.log(response);
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
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign-in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email" type="email" required onChange={handleChange} name="email" value={email}
        />

        <FormInput
          label="Password" type="password" required onChange={handleChange} name="password" value={password}
        />
        <div className='sign-in-buttons-container'>
          <Button type='submit' children='Sign In' />
          <Button type='button' onClick={signInWithGoogle} children='Sign in with Google' buttonType='google' />
        </div>
      </form>
    </div>
  )
}

export default SignInForm

