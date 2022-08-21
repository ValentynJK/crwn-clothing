// Sets up stripe
import { loadStripe } from '@stripe/stripe-js';

// Stripe init with publishable key
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);