const router = require('express').Router();
const User = require('../mongoose/models/User');

//LOGUEO
router.post('/', async (req, res)=>{
      const {userName, password} = req.body;

      if(!userName || !password) return res.send(400).json({error : 'Some fields are empty'});

      const result = await User.findOne({
            userName,
            password
      }).populate('favorite')

      if(!result) return res.status(400).json({error : 'User not found'});

      res.status(200).json({success : 'Login successfuly', user : result})
});

module.exports = router;