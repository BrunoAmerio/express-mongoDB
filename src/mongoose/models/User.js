const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
      name : {
            type : String,
            unique : false,
            index :  true
      },
      lastName : {
            type : String,
            unique : false,
            index :  true
      },
      userName : {
            type : String, 
            unique : true,
            index :  true
      },
      password : {
            type : String, 
            unique : false,
            index :  true
      },
      favorite : {
            type : mongoose.Types.ObjectId, 
            ref : 'Favorite'
      },
      recipes : [{
            type : mongoose.Types.ObjectId, 
            ref : 'Recipe'
      }]
});



module.exports = mongoose.model('User', userSchema);