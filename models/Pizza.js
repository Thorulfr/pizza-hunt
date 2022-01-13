// Imports
const { Schema, model } = require('mongoose');

// Regulate data
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
        },
        createdBy: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        size: {
            type: String,
            default: 'Large',
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Get total count of comments/replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

// Create pizza model using schema
const Pizza = model('Pizza', PizzaSchema);

// Exports
module.exports = Pizza;
