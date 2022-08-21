// react
import { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// selectors
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
// actions
import { clearCart } from '../../store/cart/cart.action';
// stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; // key component for credit card, renders input field for the payment
// component
import { BUTTON_TYPES } from "../button/button.component";
// styling
import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles'

const PaymentForm = () => {

  const dispatch = useDispatch();
  const stripe = useStripe(); // to make requests
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return
    };
    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then((res) => res.json());

    const { paymentIntent: { client_secret } } = response;

    const cardDetails = elements.getElement(CardElement);
    if (cardDetails === null) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest'
        }
      }
    });
    setIsProcessingPayment(false);


    if (paymentResult.error) {
      const { code, message, type } = paymentResult.error;
      alert(`
      Error code: ${code};
      Error type: ${type}
      Message: ${message};
      `);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        dispatch(clearCart());
        cardDetails.clear();
        alert('Payment successful')
      }
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler} >
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPES.inverted}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
};

export default PaymentForm