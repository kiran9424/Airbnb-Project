const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const config = require('./config/dev')
const fakeDB = require('./models/fakeDb')
const rentalRoute = require('./routes/Rental')
const userRoute = require('./routes/user')
const bookingRoute = require('./routes/booking');
const paymentRoute = require('./routes/payment')


mongoose.connect(config.DB_URI, { useNewUrlParser: true } ).then(()=>{
    const newDb = new fakeDB();
    // newDb.seedDb();
});
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/rentals',rentalRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/booking',bookingRoute);
app.use('/api/v1/payments',paymentRoute);

app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error:"You are not authorized user"})
    }
})

const PORT = process.env.PORT||3001

app.listen(PORT,()=>{
    console.log(`started on port ${PORT}`);
    
})