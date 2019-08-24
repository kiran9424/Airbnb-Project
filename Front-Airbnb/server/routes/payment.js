const express = require('express');
const route = express.Router();

const payment = require('../controllers/payment');
const {requiresignin} = require('../controllers/user');

route.get('',requiresignin,payment.getPendingPayments)

module.exports = route;
