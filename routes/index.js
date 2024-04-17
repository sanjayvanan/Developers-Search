const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { home,
        dashboard} = require('../controller/indexController')

// Welcome Page
router.get('/', forwardAuthenticated, home);

// Dashboard
router.get('/dashboard', ensureAuthenticated, dashboard);

module.exports = router;


// router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
  
//   try{
//     const allUsers = await User.find({}).populate('skills')
//     console.log(allUsers);
//      return res.render('index',ensureAuthenticated,{allUsers,req.user})
//   }
//   catch(error){
//     console.log(error);
//     res.status(500).json({error:error});
//   }
 
// });