const dayjs = require('dayjs');
const router = require('express').Router();
require('dotenv').config();
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const today = dayjs().format('MM/DD/YYYY');
    res.status(200).json(today);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
