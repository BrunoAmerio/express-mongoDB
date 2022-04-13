const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
      image : String,
      title : {
            type : String,
            required : true
      },
      diets : [{
            type : String,
            required : true
      }],
      cuisines : [{ type : String }],
      readyInMinutes : {
            type : Number,
            required : true
      },
      summary :{
            type : String,
            required : false
      },
      instructions : {
            type : String,
            required : true
      },
      Servings : Number,
})

module.exports = mongoose.model('Recipe', recipeSchema);