
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Project = require('../models/Project')
const Skill =  require('../models/Skill')
// Load User model
const User = require('../models/User');

//LOGIN PAGE
const loginPage = async( req, res ) =>{
    res.render('login')
}

//REGISTER PAGE

const registerPage = async( req , res )=>{
    res.render('register')
}

// registerUser

const  registerUser = async(req,res)=>{
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('signup', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()     
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
}

//login User

const loginUser = async( req, res, next )=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
}

//logout user

const logout = async(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}


// account

const account = async(req, res)=>{
    try {

        const Users = await User.find({_id:req.user._id})
        console.log(Users);
        
        const skills = await Skill.find({ owner: req.user._id });
        console.log(skills);
        
        const projects = await Project.find({ owner: req.user._id });
        console.log(projects);
    
        res.render("account", { projects, skills:skills,Users:Users[0] });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
}

module.exports={
    loginPage,
    registerPage,
    registerUser,
    loginUser,
    logout,
    account
}