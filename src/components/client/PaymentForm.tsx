import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { stripePromise } from "./Stripe";
interface PaymentFormProps {
  userId: string;
  amount: number;
  onSuccess?: () => void;
}

const CheckoutForm: React.FC<PaymentFormProps> = ({ userId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        "/api/payment-intent",
        { userId, amount },
        { withCredentials: true } // 👈 important si JWT cookie
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setMessage(result.error.message ?? "Erreur de paiement");
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("Paiement réussi 🎉");
        onSuccess?.();
      }
    } catch (err) {
      setMessage("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || loading}>
        {loading ? "Paiement..." : `Payer ${(amount / 100).toFixed(2)} €`}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export const PaymentForm: React.FC<PaymentFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);
