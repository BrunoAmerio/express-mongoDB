const router = require('express').Router();
const Diet = require('../mongoose/models/Diet');

//DEVUELVE TODAS LAS DIETAS EXISTENTES EN LA BASE DE DATOS
router.get('/', async (req, res) =>{
      const diets = await Diet.find().populate('recipes')
      res.status(200).json({diets : diets});
});

module.exports = router;