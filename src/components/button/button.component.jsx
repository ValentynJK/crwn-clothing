import './button.styles.scss';

// holds general button styling types
const buttonTypes = {
  google: 'google-sign-in',
  inverted: 'inverted',
  checkout: 'checkout'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${buttonTypes[buttonType]}`} {...otherProps}>
      {children}
    </button>
  )
}

export default Button