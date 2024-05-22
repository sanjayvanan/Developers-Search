//importing models
const Tag = require('../models/Tag')
const Project = require('../models/Project')
const Skill = require('../models/Skill')

//mongoose
const mongoose = require('mongoose');

//adding skill form page
 
const addSkill = async(req , res )=>{
    return res.render('Addskill')
}

// createSkill in the db

const  createNewSkill=async (req,res)=>{
    try{
        const{name, description} = req.body;
        const skills = await Skill.create({owner:req.user._id,name, description})
        res.status(200);
        res.redirect('/users/account');
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}



const showEditPage = async (req, res) => {
    const { id } = req.params.id;
    console.log("ID from params:", id); // Log the value of id to see if it's null or undefined
    Skill.findById(id, (err, value) => {
        if (err) {
            console.log(err);
            return res.send("Error finding the skill");
        }
        
        
        if (!value) {
            console.log("Skill not found");
            return res.send("Skill not found");
        }

        console.log("Skill found:", value); // Log the value returned by findById
        res.render("edit_skills", { skill: value });
    });
};

//edit the skills 
const editskills = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        
        // Assuming Skill is your Mongoose model
        const skill = await Skill.findById(id);

        // Check if the skill exists
        if (!skill) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        // Check if the user owns the skill (you may need to adjust this logic as needed)
        if (skill.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to edit this skill' });
        }

        // Update the skill properties
        skill.name = name;
        skill.description = description;
        
        // Save the updated skill
        await skill.save();

        res.status(200).json({ message: 'Skill updated successfully', skill });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  addSkill,
  createNewSkill,
  editskills,
  showEditPage
}