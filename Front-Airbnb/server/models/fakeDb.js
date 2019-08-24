const Rental = require('../models/Rental');
const User = require('../models/user');
const fakeData = require('../data.json');
const Booking =require('../models/booking');

class FakeDb {

    constructor() {
      this.rentals = fakeData.rentals;
      this.users = fakeData.users;
    }
  
    async cleanDb() {
      await User.remove({});
      await Rental.remove({});
      await Booking.remove({});
    }
  
    pushDataToDb() {
      const user = new User(this.users[0]);
      const user2 = new User(this.users[1]);
  
      this.rentals.forEach((rental) => {
        const newRental = new Rental(rental);
        newRental.user = user;
  
        user.rentals.push(newRental);
        newRental.save();
      });
  
      user.save();
      user2.save();
    }
  
    async seedDb() {
      await this.cleanDb();
      this.pushDataToDb();
    }
  }
  
  module.exports = FakeDb;