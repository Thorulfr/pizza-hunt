// Imports
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Regulate reply data
const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        replyBody: {
            type: 'string',
            required: true,
            trim: true,
        },
        writtenBy: {
            type: 'string',
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Regulate data
const CommentSchema = new Schema(
    {
        writtenBy: {
            type: 'string',
            required: true,
            trim: true,
        },
        commentBody: {
            type: 'string',
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        replies: [ReplySchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Get number of replies
CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
