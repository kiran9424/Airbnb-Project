const express = require('express');
const route = express.Router();
const {requiresignin} = require('../controllers/user');
const {createBooking,getUserBookings} = require('../controllers/booking')

route.post('',requiresignin,createBooking);
route.get('/manage',requiresignin,getUserBookings);

module.exports = route;