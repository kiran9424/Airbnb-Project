const express = require('express');
const route = express.Router();
const rental = require('../models/Rental');
const User = require('../models/user');
const { requiresignin } = require('../controllers/user');
const { normalizeErrors } = require('../helpers/mongoose');


route.get('/manage',requiresignin,(req,res)=>{
    const user = res.locals.user;
    rental
    .where({user})
    .populate('bookings')
    .exec(function(err, foundRentals) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json(foundRentals);
  });
})

 route.get('/:id/verify-user',requiresignin,(req,res)=>{
    const user = res.locals.user;

    rental.findById(req.params.id)
    .populate('user')
    .exec(function(err,foundRental){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});  
        }

        if(foundRental.user.id !== user.id){
            return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not rental owner!' }] });
        }
         return res.json(foundRental);
    })
 })

route.get('/:id', (req, res) => {
    const rentalId = req.params.id;
    rental.findById(rentalId).populate('user', 'username-_id').populate('bookings', 'startAt endAt-_id')
        .exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send({ message: "rental not found" })
            }
            return res.json(foundRental);
        })
})

route.patch('/:id',requiresignin,(req,res)=>{
    const rentalData = req.body;
    const user = res.locals.user;

    rental.findById(req.params.id)
    .populate('user')
    .exec((err,foundRental)=>{
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(foundRental.user.id !== user.id){
            return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not rental owner!' }] });
        }

        foundRental.set(rentalData);
        foundRental.save((err)=>{
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            return res.status(201).json(foundRental);
        })
    })
})


route.delete('/:id', requiresignin, (req, res) => {
    const user = res.locals.user;

    rental.findById(req.params.id)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match: { startAt: { $gt: new Date() } }
        })
        .exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (user.id !== foundRental.user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not rental owner!' }] });
            }
            if (foundRental.bookings.length > 0) {
                return res.status(422).send({ errors: [{ title: 'Active Bookings!', detail: 'Cannot delete rental with active bookings!' }] });
            }

            foundRental.remove(function (err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }
                return res.json({'status': 'deleted'});
            })
        })
})



route.post('', requiresignin, function (req, res) {
    const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
    const user = res.locals.user;

    const rental1 = new rental({ title, city, street, category, image, shared, bedrooms, description, dailyRate });
    rental1.user = user;

    rental.create(rental1, function (err, newRental) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        User.update({ _id: user.id }, { $push: { rentals: newRental } }, function () { });

        return res.json(newRental);
    });
});


route.get('', (req, res) => {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};

    // if (city) {
    //     rental.find({ city: city.toLowerCase() })
    //         .select('-bookings')
    //         .exec(function (err, filterRentals) {
    //             if (err) {
    //                 return res.status(422).send({ errors: normalizeErrors(err.errors) });
    //             }
    //             if (filterRentals.length === 0) {
    //                 return res.status(422).send({ errors: [{ ttle: 'No rentals found', detail: `${city} Not Found` }] });
    //             }

    //             return res.json(filterRentals);
    //         })

    // } else {
    rental.find(query).select('-bookings').exec(function (err, foundRental) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        if (city && foundRental.length === 0) {
            return res.status(422).send({ errors: [{ ttle: 'No rentals found', detail: `${city} Not Found` }] });
        }
        return res.json(foundRental);
    })
    // }

});



module.exports = route;