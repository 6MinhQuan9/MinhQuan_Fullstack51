const express = require('express');

const auth = require('../middlewares/auth');

const app = express.Router();

const multer = require('multer');

const { createUser, loginUser, logoutUser, getAllUsers, updateUserById, deleteUserById, uploadAvatar, viewAvatar, forgotPassword, resetPassword} =
 require('../controllers/userController');

 const upload = multer ({
     limits: {
         fileSize: 1024 * 1024 * 1024
     },
     fileFilter( req, res, cb) {
         if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
             return cb( new Error("Please upload image!"));
         }
         cb (undefine, true);
     }
 })

 app.post('/createUser', createUser);

 app.post('/login', loginUser);

 app.post('logout', auth, logoutUser);

 app.post('/forgot-password', forgotPassword);

 app.post('/reset-password', resetPassword);

 app.get('/all-users', getAllUsers);

 app.patch('/updateUserById/:id', updateUserById);

 app.delete('/deleteUserById/:id', deleteUserById);

 app.post('/me/uploadAvatar', auth, upload.single("avatar"), uploadAvatar);

 app.get('/:id/avatar', viewAvatar);

 modul.exports = app;