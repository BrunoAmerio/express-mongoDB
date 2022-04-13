const router = require('express').Router();
const Favorite = require('../mongoose/models/Favorite');

//DEVUELVE EL SCHEMA DE FAOVIRTOS 
router.get('/:favoriteId', async (req, res)=>{
      const {favoriteId} = req.params;
      if(!favoriteId) return res.status(400).json({error : 'The necesary data was not sent'});

      const result = await Favorite.findOne({
            _id : favoriteId
      });
      if(!result) return res.status(400).json({error :'The id provided was not found'});

      res.status(200).json(result);
})


//AGREGA A FAVOIRTOS UNA RECETA
router.post('/:favoriteId/:recipeId', async (req, res)=>{
      const {recipeId, favoriteId} = req.params;
      if(!recipeId || !favoriteId) return res.status(400).json({error: 'The necessary data was not sent'});

      //Buscamos el schema de favoritos perteneciente al usuario
      const result = await Favorite.findOne({
            _id : favoriteId
      }); 
      if(!result) return res.status(400).json({error : 'The id provided was not found'})

      const index = result.collectionId.indexOf(recipeId);
      if(index >= 0) return res.status(400).json({error : 'The recipe is already in favorites'})

      try {
            result.collectionId.push(recipeId)
            result.save()
            res.status(200).json({success : 'The recipe has been added to favorites ', result});
            
      } catch (error) {
            res.status(400).json({error : error.message})
      }

});


//ELIMINA DE FAVORITOS UNA RECETA
router.delete('/:favoriteId/:recipeId', async (req, res)=>{
      const {favoriteId, recipeId} = req.params
      if(!favoriteId || !recipeId) return res.status(400).json({error : 'The necessary data was not sent'});

      const result = await Favorite.findOne({
            _id : favoriteId
      }); 
      if(!result) return res.status(400).json({error : 'The id provided was not found'})

      try {
            const index = result.collectionId.indexOf(recipeId);

            if(index < 0) return res.status(400).json({error : 'Recipe not found'});

            result.collectionId.splice(index, 1);
            result.save();
            res.status(200).json({success : 'Recipe removed from favorites', result});

      } catch (error) {
            return res.status(400).json({error : error.message});
      }
})

module.exports = router;