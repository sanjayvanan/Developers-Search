const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created: { type: Date, default: Date.now }
});


const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag 