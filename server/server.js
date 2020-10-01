const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/3dpyp";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to ' + uri))
  .catch(err => console.log('ERROR connecting to: ' + uri + '. ' + err));

app.use('/filaments', require('./routes/filaments-router'));
app.use('/printers', require('./routes/printers-router'));
app.use('/hotends', require('./routes/hotends-router'));

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
