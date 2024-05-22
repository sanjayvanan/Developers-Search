const express = require("express")
const app = express()

const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const AdminBroExpress = require('@admin-bro/express');


const Message = require("./models/Message")
const User = require("./models/User")
const Project = require("./models/Project")
const Review  = require("./models/Review")
const Skill = require("./models/Skill")
const Tag = require("./models/Tag")


AdminBro.registerAdapter(AdminBroMongoose);


const admin = new AdminBro({
  resources: [ Message,User,Project,Review,Skill,Tag],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(admin);

app.use(admin.options.rootPath, router);
const dbPort = process.env.DB_PORT || 4001
app.listen(dbPort,()=>{
    console.log("DB Adminstration running on port for Admin: http://127.0.0.1:"+dbPort+"/admin");
})
