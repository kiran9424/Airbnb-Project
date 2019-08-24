const Payment = require('../models/payment')
const { normalizeErrors } = require('../helpers/mongoose');

exports.getPendingPayments = (req,res)=>{
    const user = res.locals.user;

    Payment
    .where({toUser:user})
    .populate({
        path:'booking',
        populate:{path:'rental'}
    })
    .populate('fromUser')
    .exec(function(err,foundPayment){
        if(err){
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.json(foundPayment);
    })
}