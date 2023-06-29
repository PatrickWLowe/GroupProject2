const router = require('express').Router();
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');


router.use('/users', userRoutes);
router.use('/foods', foodRoutes);

module.exports = router;
