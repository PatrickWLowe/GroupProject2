const router = require('express').Router();
require('dotenv').config();
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        const food_weight = req.body.food_weight;
        const name = req.body.name;
        const URL = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&nutrition-type=logging&ingr=${food_weight}g%20${name}`;
        console.log(URL);
        const edamamAPIResponse = await fetch (URL,
            {
                method: 'GET',
            }
        );
        const response = await edamamAPIResponse.json();
        res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

  module.exports = router;