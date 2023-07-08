const router = require('express').Router();
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');
const edamamRoutes = require('./edamamRoutes');
const getTotals = require('./getTotals');
const getDay = require('./getDay');

router.use('/users', userRoutes);
router.use('/foods', foodRoutes);
router.use('/edamam', edamamRoutes);
router.use('/getTotals', getTotals);
router.use('/getDay', getDay);



module.exports = router;


