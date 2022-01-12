const { Schema, model } = require('mongoose');

// Regulate data
const PizzaSchema = new Schema({
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
});

// Create pizza model using schema
const Pizza = model('Pizza', PizzaSchema);

// Exports
module.exports = Pizza;
