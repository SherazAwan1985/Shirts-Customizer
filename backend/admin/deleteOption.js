const mongoose = require('mongoose');
const Option = require('../models/Options');
const dotenv = require('dotenv');
dotenv.config();
const deleteOption = async (req, res) => {
    const { id } = req.params;
  console.log('Delete route called with id:', req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'Option ID is required' });
    }

    try {
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        await Option.deleteOne({ _id: id });
        res.status(200).json({ message: 'Option deleted successfully' });
    } catch (error) {
        console.error('Error deleting option:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = deleteOption;
//