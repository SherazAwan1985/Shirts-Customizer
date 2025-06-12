const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const createOption = require('./admin/createOption');
const deleteOption = require('./admin/deleteOption'); 
const optionsList = require('./admin/optionslist');
const userLogin = require('./admin/userLogin');
const cors = require('cors');

dotenv.config({ path: path.resolve(__dirname, 'server.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});
app.post('/admin/options/create', createOption);
app.delete('/admin/delete/:id', deleteOption);
app.get('/admin/options', optionsList);
app.post('/login', userLogin);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
