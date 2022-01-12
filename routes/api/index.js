// Imports
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// Prefix /pizzas to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

module.exports = router;
