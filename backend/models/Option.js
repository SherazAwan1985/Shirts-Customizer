const mongoose = require('mongoose');

const subOptionSchema = new mongoose.Schema({
  name: String,
  value: String,
  subOptions: [this], // Recursive nesting
}, { _id: false });

const optionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  extraInfo: String,
  subOptions: [subOptionSchema],
});

module.exports = mongoose.model('Option', optionSchema);

