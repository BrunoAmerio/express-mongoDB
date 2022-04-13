const axios = require('axios');
const router = require('express').Router();
const Recipe = require('../mongoose/models/Recipe');
const User = require('../mongoose/models/User');
const uploadImage = require('../utils/cloudinary');

//TODAS LAS RECETAS
router.get('/' , (req, res)=>{
      //Hacemos la peticion a la API de spoonacular
      axios.get('https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=71d188a38c254ab7bfe20099604f1ac8')
      .then(result => res.status(200).json({recipes : result.data.results }) )
      .catch(err => res.status(400).json({error : err.response.data}) );
});


//DETALLE DE UNA RECETA
router.get('/detail/:id', async (req, res)=>{
      const { id } = req.params;
      if(isNaN(id)){
            //En caso de que la receta fue creada por un usuario
            const result = await Recipe.findOne({_id : id})
            if(!result) return res.status(400).json({error : 'Recipe not found'});
            res.status(200).json(result)
      } else {
            //En caso de que la receta es de spoonacular
            axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=6768c78e57394e049e11f3f23d4a2f2c`)
            .then(response => res.status(200).json({recipe : response.data}))
      }
})


//CREAR UNA RECETA
router.post('/:userId', async (req, res)=>{
      let newImage = '';
      const {userId} = req.params;
      const {title, diets, readyInMinutes, instructions} = req.body;
      if(!title , !diets, !instructions, !readyInMinutes) return res.status(400).json({error : 'Some field are empty'});

      //Llegan como un string, y deben ser un array
      req.body.diets = req.body.diets.split(',');
      req.body.cuisines = req.body.cuisines.split(',');

      const user = await User.findOne({
            _id : userId
      })
      if(!user) return res.status(400).json({error : 'User not found'});

      //En caso de que envie una imagen, la subimos
      if(req.files?.image){
            newImage = await uploadImage(req.files.image.tempFilePath)
      }

      try {
            const newRecipe = new Recipe({
                  ...req.body,
                  image : newImage.secure_url
            });
            user.recipes.push(newRecipe._id);
            newRecipe.save();
            user.save();
            res.status(201).json({success : 'Recipe create successfuly', recipe : newRecipe});

      } catch (error) {
            res.status(400).json({error : error.message});
      };
});


//ELIMINAR UNA RECETA
router.delete('/:recipeId', async (req, res)=>{
      const {recipeId} = req.params;
      const recipe = await Recipe.findOne( {_id : recipeId} );
      if (!recipe) return res.status(400).json({error : 'Recipe not found'});

      try {
            await Recipe.deleteOne({_id : recipeId});
            res.status(200).json({success : 'Recipe deleted successfuly'});
      } catch (error) {
            res.status(400).json({error : error.message});
      }
})


//DEVOLVER LAS RECETAS CREADAS POR EL USUARIO
router.get('/user/:id', async (req, res)=>{
      const { id } = req.params;
      if(!id) return res.status(400).json({error : 'The id was not sent'})

      const user = await User.findOne({_id : id});
      if(!user) return res.status(400).json({error : 'User not found'});

      try {
            res.status(200).json({recipes : user.recipes});
      } catch (error) {
            res.status(400).json({error : error.message});
      }
});


module.exports = router;