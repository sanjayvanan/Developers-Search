//importing models
const Tag = require('../models/Tag')
const Project = require('../models/Project')
const Skill = require('../models/Skill')

//mongoose
const mongoose = require('mongoose');




//-----------------------------------------------------------------------------------------
// create Project page
const projectForm = async (req , res) => {
    return res.render('create-project')
}

// creating project
const createProject = async (req , res) => {
    try {
        const { title, description, demo_link, source_link, tags } = req.body;
        const owner = req.user._id; // Assuming req.user._id contains the current user's ID

        // Split tags string into an array
        const tagArray = tags.split(',').map(tag => tag.trim());
        console.log(tagArray);
        

        // Create the project
        const newProject = new Project({
            owner,
            title,
            description,
            demo_link,
            source_link,
            tags: tags,
            tagsArray : tagArray
        });

        // Save the project
        await newProject.save().then(()=>{
            return  res.redirect('/users/account')
        })
        
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


//delete the project

const deleteProject = async(req, res)=>{
    try {
        const id = req.params.id;
    
        // Validate that the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid project ID' });
        }
    
        // Try to delete the project
        const result = await Project.deleteOne({ _id: id });
    
        // Check if a project was deleted
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Project not found' });
        }
    
        // Successfully deleted project
        res.redirect('/users/account');
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

//edit page for projects

const showEditPage=async(req,res)=>{
    
        const id = req.params.id;
        Project.findById(id,(err, value)=>{
            if(err){
                console.log(err);
                res.send('error finding the project')
            }
            else{
                res.render('Edit_project',{value:value});
            }
        })

}

const editProject = async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, featured_image, demo_link, source_link, tags /* other fields */ } = req.body;
  
      // Validate that the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }
  
      // Update the project
      const result = await Project.updateOne(
        { _id: id },
        {
          $set: {
            title,
            description,
            featured_image,
            demo_link,
            source_link,
            tags, // Assuming tags is an array of ObjectId
            /* update other fields as needed */
          },
        }
      );
  
      // Check if a project was updated
      if (result.nModified === 0) {
        return res.status(404).json({ error: 'Project not found or no changes made' });
      }
  
      // Successfully updated project
      res.redirect('/users/account');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

};


module.exports = {
    projectForm,
    createProject,
    deleteProject,
    showEditPage,
    editProject
}