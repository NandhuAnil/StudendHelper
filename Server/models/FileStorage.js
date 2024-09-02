const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileStorageSchema = new Schema({
    filetitle: String,
    file_url: String
});

const FileStorage = mongoose.model('FileStorage', fileStorageSchema);

module.exports = FileStorage