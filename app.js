const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config

require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

require("./db.js")

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/project',require('./routes/projects.js'))
app.use('/inbox',require('./routes/inbox.js'))
app.use('/project-page',require('./routes/projects-Folder.js'))
app.use((req, res)=>{
  res.status(404).json({error: "Sorry the page does not exist"});
})
// app.use(
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
