const express = require('express') 
const router = express.Router();


//RUTAS
const register = require('./register');
const diets = require('./diets');
const recipes = require('./recipes');
const login = require('./login');
const favorites = require('./favorites');


router.use(express.json())
router.use('/register', register);
router.use('/login', login);
router.use('/diet', diets);
router.use('/recipe', recipes);
router.use('/favorite', favorites);


module.exports = router;