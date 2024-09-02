const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
    filename: String,
    subject: String,
    department: String,
    semester: String,
    unit: String,
    fileStorage: { type: Schema.Types.ObjectId, ref: 'FileStorage' }
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel