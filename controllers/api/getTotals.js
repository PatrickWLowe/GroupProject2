const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Food } = require('../../models');

router.get('/', withAuth, async (req, res) => {
    try {
        const totalCalories = await Food.sum('calories', {where: {user_id: req.session.user_id}});
        const totalProtein = await Food.sum('protein', {where: {user_id: req.session.user_id}});
        const totalFat = await Food.sum('fat', {where: {user_id: req.session.user_id}});
        const totalCarbs = await Food.sum('carbs', {where: {user_id: req.session.user_id}});
        
        const response = {
            totalCalories,
            totalProtein,
            totalFat,
            totalCarbs
        }
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  module.exports = router;