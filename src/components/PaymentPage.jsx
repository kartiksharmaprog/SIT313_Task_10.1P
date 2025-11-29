import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Segment, Header, Button, Message} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51SO9IJGLAlxfLPJOhkhlXvVjrWBGV835J8SGnSJT0uVfM8ViWWOK3QiDEYpgrEGv5Qiq2yySdcUtnneAoHQXoDiR00BVGNFan8');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        setTimeout(() => {
          alert(' Payment successful! Welcome to Premium!');
          navigate('/home');
        }, 1000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container style={{ padding: '2em 1em', maxWidth: '500px' }}>
      <Header as='h1' textAlign='center' style={{ marginBottom: '1.5em' }}>
        Upgrade to Premium
      </Header>

      <Segment raised style={{ padding: '2em' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5em' }}>
          <Header as='h2' color='green'>$9.99/month</Header>
          <p>Get all the good stuff: code editor, custom themes, analytics, and no ads!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1em' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '0.5em', display: 'block' }}>
              Card details
            </label>
            <div style={{ padding: '1em', border: '1px solid #ddd', borderRadius: '4px' }}>
              <CardElement />
            </div>
          </div>

          {error && <Message error>{error}</Message>}

          <Button type="submit" color='green' fluid size='large' loading={processing} disabled={!stripe || processing}>
            {processing ? 'Processing...' : 'Subscribe Now'}
          </Button>
        </form>

        <Message >
          <p><strong>Test card:</strong> 4242 4242 4242 4242</p>
          <p>Any future date, any CVC. No real charges!</p>
        </Message>
      </Segment>
    </Container>
  );
};

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentPage;