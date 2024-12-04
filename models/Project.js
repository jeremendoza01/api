const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('./User'); // Importa el modelo de usuario

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
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
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
});
module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
