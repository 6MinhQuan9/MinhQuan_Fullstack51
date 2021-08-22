 const userModel = require('../model/user.model');

 const mangaModel = require('../model/manga.model');

 const bcrypt = require('bcryptjs');

 const jwt = require('jsonwebtoken');

 const { registerValidate, loginValidate} = require('../middlewares/validate');

 class UserController {
     getAll = (req, res) => {
         console.log(req.query.name);
         mangaModel.find({}).exec((err, mangas) => {
             if (err) {
                 res.send('Khong the lay thong tin manga!!!');
             } else {
                 console.log('mangas');
                 res.json(mangas);
             }
         });
     };

     register = async (req, res) => {
         //Validate user info
         const {error} = registerValidate(req.body);
         if(error) return res.status(400).send(error.details[0].message);

        //isEmail existed
        const emailExist = await userModel.findOne({ email: req.body.email});
        if(emailExist) return res.status(400).send('Email existed in database!!!');

        //Bcrypt to encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        //Create new user
        const newUser = new userModel();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = hashPassword;

        //Return info to client
        try{
            const user = await newUser.save();
            res.send(user);
        } catch (e) {
            console.log('Error!!!');
            res.status(400).send(e);
        }
     };


     login = async (req, res) => {
         //Validate user info
         const {error} = loginValidate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Check email
        const user = await userModel.findOne({ email: req.body.email});
        if(!user) return res.status(400).send('Email not exist in database');

        //Check password
        const loginPass = await bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!loginPass) return res.status(400).send('Password incorrect!!');

        //Generated token string
        const token = jwt.sign({ id: user._id}, 'Thisissecretkeyandcannotleak');

        //Return token for user
        res.header('auth-token',token).send(token);
     }
 }


 module.exports = new UserController();