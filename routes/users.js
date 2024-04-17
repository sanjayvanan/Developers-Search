const express = require('express');
const router = express.Router();

// Load User model

const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

//loadin the controllers
const { loginPage,
        registerPage,
        registerUser,
        loginUser,
        logout,
        account} = require('../controller/usersController')

// Login Page
router.get('/login', forwardAuthenticated, loginPage);

// Register Page
router.get('/register', forwardAuthenticated, registerPage);

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.get('/logout', logout);



router.get('/account', ensureAuthenticated, account);



//update bio

// router.get('/account/update/:id', ensureAuthenticated, (req, res) => {
//   const id = req.params.id;
//   const user = req.user;
  
//   User.findById(id, (err, service) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error finding service');
//     } else {
//       res.render('update_service', { service: service, user: user });
//     }
//   });
// });






module.exports = router;
