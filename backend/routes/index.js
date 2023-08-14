const express = require('express');
const authController = require('../controller/authController')
const blogController = require('../controller/blogController')
const commentController = require('../controller/commentController')
const auth = require('../middleware/auth')

const router = express.Router();

// test
//  router.get("/test",(req,res)=>{
//     res.json({msg:"test is pass!"})
//  })

// user

// register
router.post('/register',authController.register);

// login
router.post('/login',authController.login);

// logout
router.post('/logout', auth, authController.logout);

// refresh
router.get('/refresh', authController.refresh );

// blog

// create
router.post('/blog',auth,blogController.create )

//get all blogs
router.get('/blog/all',auth,blogController.getAll )

// gets blog by id
router.get('/blog/:id',auth,blogController.getById )

// update
router.put('/blog',auth,blogController.update )

// delete
router.delete('/blog/:id',auth,blogController.delete )

//          ------------comment  

// create comment--------------
router.post('/comment',auth,commentController.create)

// get by id
router.get('/comment/:id', auth, commentController.getById)

// CRUD
// create
// read all blogs
// read blog by id
// update
// delete

// comment 
// creat comment
// read 





module.exports = router