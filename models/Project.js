const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;
// Define the Project Schema
const projectSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    title: { type: String, required: true },
    description: { type: String, default: null },
    featured_image: { type: String, default: 'default.jpg' },
    demo_link: { type: String, default: null },
    source_link: { type: String, default: null },
    tags: {
        type : String,
        required : true
    },
    tagsArray : 
        {
            type : [String],
            required : true
        },
    
    vote_total: { type: Number, default: 0 },
    vote_ratio: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);
module.exports =  Project