const mongoose = require('mongoose');
const dietSchema = new mongoose.Schema({
      name : String,
      recipes : [{type : mongoose.Types.ObjectId, ref:'Recipe'}]
})

module.exports = mongoose.model('Diet', dietSchema);