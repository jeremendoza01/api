const mongoose = require('mongoose');
const schema = mongoose.Schema;

const epicSchema = new schema({
    project: {
        type: schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Epic', epicSchema); 
