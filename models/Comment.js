// Imports
const { Schema, model } = require('mongoose');

// Regulate data
const CommentSchema = new Schema({
    writtenBy: {
        type: 'string',
    },
    commentBody: {
        type: 'string',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
