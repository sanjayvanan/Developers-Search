//model import
const User = require("../models/User")




//welcome page
const home = async(req, res)=>{
    res.render('login')
}


//dashboard
const dashboard = async(req, res)=>{
    try {
        // Fetch all users with their associated skills
        const users = await User.find({})
        console.log(users);
        res.render('index', { allUsers:users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

module.exports = {
    home,
    dashboard
}