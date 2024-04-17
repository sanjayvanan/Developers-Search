const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types;

const Schema = mongoose.Schema;
// Define the Message Schema
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    subject: { type: String, default: null },
    body: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports =  Message ;