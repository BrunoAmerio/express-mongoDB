const router = require('express').Router();
const User = require('../mongoose/models/User');
const Favorite = require('../mongoose/models/Favorite');

router.post('/', async (req, res)=>{
      console.log(req.body)
      const {name, lastName, userName, password} = req.body ;

      if(!name || !lastName || !userName || !password) return res.status(400).json({error : 'Some fields are empty'});

      //Buscamos el usuario en la DB 
      const result = await User.findOne({userName})
      if(result) return res.status(400).json({error : 'User already exist'})

      //Creamos el nuevo usuario
      const user = new User({
            name : name,
            lastName : lastName,
            userName : userName,
            password : password
      });

      //Creamos los favoritos que tendrá este usuario
      const favorite = new Favorite();
      try {
            user.favorite = favorite._id 
            const newUser = await user.save();
            await favorite.save();
            res.status(201).json({success : 'User create successfuly', newUser});
      } catch (error) {
            res.status(400).json( {error : error.message} )
      }
});

module.exports = router;