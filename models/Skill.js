const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;
// Define the Skill Schema
const skillSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: null },
    description: { type: String, default: null },
    created: { type: Date, default: Date.now },
});
const Skill = mongoose.model('Skill', skillSchema);     

module.exports =  Skill