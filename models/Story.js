const mongoose = require('mongoose');
const epic = require('./Epic');
const sprint = require('./Sprint');
const user = require('./User');
const schema = mongoose.Schema;

const storySchema = new schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    epic: {
        type: schema.Types.ObjectId,
        ref: epic,
        required: true
    },
    sprint: {
        type: schema.Types.ObjectId,
        ref: sprint,
        required: false
    },
    owner: {
        type: schema.Types.ObjectId,
        ref: user,
        required: false
    },
    assignedTo: [{
        type: schema.Types.ObjectId,
        ref: user,
        required: false
    }],
    points: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
        max: 5,
    },
    created: {
        type: Date,
        default: Date.now,
        required: false
    },
    due: {
        type: Date,
        required: false
    },
    started: {
        type: Date,
        required: false
    },
    finished: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['todo', 'running', 'done'],
        required: false,
        default: 'todo'
    },
    icon: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Story', storySchema)