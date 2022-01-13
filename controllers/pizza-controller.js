const { Pizza } = require('../models');

const pizzaController = {
    // Get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v',
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbPizzaData) => res.json(dbPizzaData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get one pizza by ID
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v',
            })
            .select('-__v')
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this id!',
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Create a pizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then((dbPizzaData) => res.json(dbPizzaData))
            .catch((err) => res.status(400).json(err));
    },
    // Update a pizza by ID
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbPizzaData) => {
                // If no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this ID.',
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Delete a pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this id!',
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.status(400).json(err));
    },
};

module.exports = pizzaController;
