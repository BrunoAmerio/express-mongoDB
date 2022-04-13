const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const {DATABASE_URL} = process.env;
const app = require('./src/app');


const allDiest = ['gluten free','ketogenic','vegetarian','lacto-vegetarian','ovo-vegetarian','vegan','pescatarian','paleolithic','primal','fodmap friendly','whole 30','lacto ovo vegetarian','dairy free'];
const Diet = require('./src/mongoose/models/Diet');



mongoose.connect(DATABASE_URL)
.then( async () => {
      console.log('DataBase conected')

      //Controlamos que no estén creadas las dietas
      const result = await Diet.find()
      if(!result.length){
            allDiest.forEach(async item =>{
                  const diet = new Diet({name : item});
                  await diet.save();
            })
      }

      app.listen(3000, ()=> console.log('Server listen at 3000'));
})
.catch(err => console.log(err));

