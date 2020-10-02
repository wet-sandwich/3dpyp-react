const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
app.use('/api/hotends', require('./routes/hotends-router'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
