const router = require('express').Router();
const { Food, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Food }],
    });
    const foodData = await Food.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const foods = foodData.map((food) => food.get({ plain: true }));
    const user = userData.get({ plain: true });

    res.render('profile', {
      foods,
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Render the profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
