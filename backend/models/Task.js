const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maslength: [100, 'Title can not be more then 100 characters']
    },
    // Detailed description (optional kro to thik nhi to no problem)
    Description: {
        type: String,
        maxlength: [500, 'Description cannot be more then 500 characters']
    },

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Complete'],
        default: 'Pending'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: {
        tyep: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);