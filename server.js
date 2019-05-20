const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const items = require('./routes/api/items');

// BodyParser MiddleWare
app.use(bodyParser.json());

// DB config
const db = require('./config/keys.js').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongo DB connected...'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/items', items);

//Sever static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`));