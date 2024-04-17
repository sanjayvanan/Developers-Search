const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',ensureAuthenticated, async(req,res)=>{
    res.render('projects');
})

module.exports = router