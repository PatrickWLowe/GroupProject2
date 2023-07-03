const router = require('express').Router();
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');
const edamamRoutes = require('./edamamRoutes');

router.use('/users', userRoutes);
router.use('/foods', foodRoutes);
router.use('/edamam', edamamRoutes);

module.exports = router;


