// require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const handleTestWebhook = (req, res) => {
    console.log("req: " + JSON.stringify(req.body));
    return res.status(200).send("fine");
}

app.get("/webhook/test", handleTestWebhook);

app.listen(port,
    () => console.log(`Listening for Shopify webhook event data on port ${port}. Started ${new Date().toString()}`));