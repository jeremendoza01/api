const mongoose = require('mongoose');
const schema = mongoose.Schema;

const projectSchema = new schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    description: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    owner: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
