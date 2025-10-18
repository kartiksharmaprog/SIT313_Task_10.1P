import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter an email.' });
      return;
    }
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Subscription failed');

      setStatus({ type: 'success', message: data.message || 'Subscribed!' });
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2em", background: "#f5f5f5" }}>
      <div style={{ display: "flex", gap: "1em", alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>SIGN UP FOR OUR DAILY INSIDER</h3>
        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5em' }}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{ minWidth: 250 }}
            disabled={loading}
            action={
              <Button
                type="submit"
                color="white"
                loading={loading}
                disabled={loading}
              >
                Subscribe
              </Button>
            }
          />
        </form>
      </div>

      {status && (
        <div style={{ marginTop: 10, color: status.type === 'success' ? 'green' : 'red' }}>
          {status.message}
        </div>
      )}
    </div>
  );
}

export default Subscribe;