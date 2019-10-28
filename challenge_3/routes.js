var models = require('./models');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
// TODO SERVE ALL THE NECESSARY ROUTES
router.post('/createAccount', models.account.post);

// router.post('/', controller. .post);

// router.get('/', controller. .get);

// router.post('/', controller. .post);


module.exports = router;