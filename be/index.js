const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use('/', (req, res) => {
    res.send('stonks-backend is running!');
})

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server Running on Port: ${PORT}`)
    }))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);