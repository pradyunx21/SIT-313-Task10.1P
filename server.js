const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailgun = require('mailgun-js');

const app = express();
const PORT = 5001; // You can change the port if necessary

// Mailgun configuration
const mg = mailgun({
  apiKey: 'a70d285f92ead148eb4903ab32d51678-f6fe91d3-b30c5f17', // Replace with your Mailgun private API key
  domain: 'sandboxcd7ac281349c4ce3bef27704c2b89750.mailgun.org',  // Replace with your Mailgun domain
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint for subscribing to the newsletter
app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const data = {
    from: 'Daily Insider <newsletter@YOUR_MAILGUN_DOMAIN>',
    to: email,
    subject: 'Welcome to the Daily Insider Newsletter!',
    text: 'Thank you for subscribing to our newsletter!',
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    return res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});