const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String
        },
        start_date: {
            type: Date, 
            default: Date.now
        },
        stakeholders: {
            type: String
        },
    }
);

module.exports = mongoose.model("project", projectSchema);