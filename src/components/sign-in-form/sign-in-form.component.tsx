// firebase
import { AuthError, AuthErrorCodes } from 'firebase/auth'
// react, redux
import { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
// components
import Button, { BUTTON_TYPES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
// redux actions
import { googleSignStart, emailSignInStart } from '../../store/user/user.action'
// styling
import { SignInButtonsContainer, SignInContainer } from './sign-in-form.styles'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // accessing the current user sign in status setter

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  }, [formFields]);

  const resetFormFields = useCallback(() => {
    setFormFields(defaultFormFields)
  }, [])

  const signInWithGoogle = useCallback(async () => {
    dispatch(googleSignStart())
  }, []);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    }
    catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert('Incorrect password for email');
          break;
        case AuthErrorCodes.USER_DELETED:
          alert('No user associated with this email, please check spelling or sign up');
          break;
        default:
          console.log(`Error occurred: ${(error as AuthError).message}`)
          break;
      }
    }
  }, [email, password, resetFormFields])

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

