const mongoose = require('mongoose');
const Option = require('../models/Option');

// Recursive function to check max depth
const checkMaxDepth = (subOptions, depth = 1) => {
  if (!Array.isArray(subOptions)) return true;
  if (depth > 5) return false;

  for (const option of subOptions) {
    if (option.subOptions && !checkMaxDepth(option.subOptions, depth + 1)) {
      return false;
    }
  }

  return true;
};

// Recursive function to sanitize and construct sub-options
const buildSubOptions = (options) => {
  return options.map(option => {
    const { title, price, image, extraInfo, subOptions } = option;

    const newOption = {
      title: title || '',
      price: price || 0,
      image: image || '',
      extraInfo: extraInfo || '',
      subOptions: Array.isArray(subOptions) ? buildSubOptions(subOptions) : []
    };

    return newOption;
  });
};

const createOption = async (req, res) => {
  const { title, price, image, extraInfo, subOptions } = req.body;

  if (!title || price === undefined) {
    return res.status(400).json({ error: 'Title and price are required' });
  }

  if (!checkMaxDepth(subOptions)) {
    return res.status(400).json({ error: 'Sub-options nesting exceeds maximum depth of 5' });
  }

  try {
    const newOption = new Option({
      title,
      price,
      image,
      extraInfo,
      subOptions: Array.isArray(subOptions) ? buildSubOptions(subOptions) : [],
    });

    await newOption.save();
    res.status(201).json(newOption);
  } catch (error) {
    console.error('Error creating option:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = createOption;
