require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const postmark = require('postmark');

const app = express();
// choose a default port that won't conflict with React dev server (3000)
// use SERVER_PORT for the backend so a root .env PORT won't collide with React
const PORT = process.env.SERVER_PORT || 5000;
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow requests from the React dev server by default
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: corsOrigin }));

// serve static files if needed
app.use(express.static(path.join(__dirname, 'public')));

app.post('/subscribe', async (req, res) => {
  console.log("Received data:", req.body);

  const email = (req.body.email || '').toString().trim();
  if (!email) return res.status(400).json({ message: 'Email is required !!!' });

  // simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.warn('Invalid email format:', email);
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const result = await client.sendEmail({
      From: process.env.SENDER_EMAIL,
      To: email,
      Subject: 'Welcome to DEV@Deakin! By: Kartik Sharma',
      TextBody: 'Thanks for subscribing to DEV@Deakin.',
      HtmlBody: '<h2>Welcome to DEV@Deakin!</h2><p>Thanks for subscribing to <strong>DEV@Deakin</strong>.</p>'
    });

    console.log('Postmark send result:', result);
    // return Postmark response so client can inspect it if needed
    res.json({ message: 'Email sent successfully!!!', postmark: result });
  } catch (error) {
    console.error("Postmark error:", error);
    // include error details in response in dev mode
    const msg = error && error.message ? error.message : 'Failed to send email';
    res.status(500).json({ message: msg, details: error });
  }
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
