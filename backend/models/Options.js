const mongoose = require('mongoose');
const { schema: optionSchema } = require('./Option');

optionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// ✅ Check if the model is already compiled
const Option = mongoose.models.Option || mongoose.model('Option', optionSchema);

module.exports = Option;
