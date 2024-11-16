const express = require("express");
const mailgun = require("mailgun-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const apiKey = '5251a174194e3c583177246baab94b3e-79295dd0-3fd1c949'; 
const domain = 'sandboxa0a71913b58a4f3f86615cc1c7ccbf32.mailgun.org'; 

const mg = mailgun({ apiKey, domain });




app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const data = {
    from: `gopeshs525@gmail.com`,
    to: email,
    subject: "Subscription Confirmation",
    text: "Thank you for subscribing to our Daily Insider!",
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Subscription email sent successfully!" });
  });
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
