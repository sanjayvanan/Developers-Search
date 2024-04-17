const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const { 
        projectForm,
        createProject,
        deleteProject,
        showEditPage,
        editProject,
        } = require('../controller/projectsController')
const  {
    addSkill,
    createNewSkill,
    editskills
    }  = require('../controller/skillController')

//Skills
//-----------------------------------------------------------------------

//add skill
router.get('/add-skill',ensureAuthenticated, addSkill)

router.post('/add-skill',ensureAuthenticated, createNewSkill)

//edit page for skills
router.get('/edit-skill/:id',ensureAuthenticated,  showEditPage),

//Project
//----------------------------------------------------------------------
//  project form
router.get('/create-project', ensureAuthenticated, projectForm);


router.post('/create-project',ensureAuthenticated,createProject)

// Dashboard


//account page


router.get('/delete-project/:id', ensureAuthenticated, deleteProject);



//get to the editing page
router.get('/edit-project/:id',ensureAuthenticated, showEditPage)

// editing the project
router.post('/edit-project/:id', ensureAuthenticated, editProject);

module.exports = router;
