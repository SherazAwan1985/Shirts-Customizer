// admin/optionslist.js

const Option = require('../models/Options');

module.exports = async function (req, res) {
  try {
    const options = await Option.find(); // Fetch all saved documents
    res.status(200).json(options);
  } catch (err) {
    console.error('❌ Error fetching options:', err);
    res.status(500).json({ error: 'Failed to fetch options' });
  }
};
