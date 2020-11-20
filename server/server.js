const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user-model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(session({
  secret: "temporary secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to ' + uri))
  .catch(err => console.log('ERROR connecting to: ' + uri + '. ' + err));

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api/filaments', require('./routes/filaments-router'));
app.use('/api/printers', require('./routes/printers-router'));
app.use('/auth', require('./routes/auth-router'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
