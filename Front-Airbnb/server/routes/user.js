const express = require('express');
const {auth,register} = require('../controllers/user')
const route = express.Router();

route.post('/auth',auth);

route.post('/register',register);

module.exports = route;