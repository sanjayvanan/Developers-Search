const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;
// Define the Review Schema
const reviewSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    body: { type: String, default: null },
    value: { type: String, enum: ['up', 'down'], required: true },
    created: { type: Date, default: Date.now },
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review