import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from './button.styles';
import { FC, ButtonHTMLAttributes } from 'react'

// holds general button styling types
export enum BUTTON_TYPES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
};

const getButton = (buttonType = BUTTON_TYPES.base): typeof BaseButton => ({
  [BUTTON_TYPES.base]: BaseButton,
  [BUTTON_TYPES.google]: GoogleSignInButton,
  [BUTTON_TYPES.inverted]: InvertedButton,
}[buttonType]);

export type ButtonProps = {
  children: string;
  buttonType?: BUTTON_TYPES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>


const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  )
}

export default Button;