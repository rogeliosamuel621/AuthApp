const { Router } = require('express');
const router = Router();

const { facebookLoginController } = require('../controllers/');

router.post('/login/facebook', facebookLoginController);

module.exports = router;
