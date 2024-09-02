const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  }
});

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;
