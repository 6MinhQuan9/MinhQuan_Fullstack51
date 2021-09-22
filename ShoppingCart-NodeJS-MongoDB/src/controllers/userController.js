const User = require('../models/Users');

const sharp = require('sharp');

const jwt = require('jsonwebtoken');

const responseHelper = require('../helpers/responseHelpers');
const { response } = require('express');

//create new user

exports.createUser = async (req, res) => {
    const userData = req.body;

    try{
        const user = User(userData);

        await user.save();
        console.log("New user saved!!!");
        return responseHelper.successapi(res, "Created new user!!", 201, user);
    } catch( err) {
        return responseHelper.error(res, "User creation error", 400, err);
    }
};

// login user

exports.loginUser = async (req, res) => {
    try{
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateToken();
        return responseHelper.successapi(res, "Login sucessful", 200, {
            user,
            token
        });
    } catch(err) {
        return responseHelper.error(res, "Login failed", 400, err);
    }
};

//forgot password 
exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    try{
        const user = await User.findOne({ email });
        if(!user) return responseHelper.error(res, "User not found!", 400, "Email does not exist!!");

        const resetToken = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_TOKEN_KEY, { expiresIn: '20m'});

        await user.updateOne({ reserLink: resetToken });

        return responseHelper.successapi(res, "Reset token generated!", 200, resetToken);

    } catch(e){
        return responseHelper.error(res, "Error occured!", 400, "Error in generating token!");
    }
};

// reset password
exports.resetPassword = async(req, res) => {
    const resetToken = req.body.resetToken;
    if(!resetToken) return responseHelper.error(res, "Reset token not found!", 400, "Please provide reset token");

    const newPassword = req.body.newPassword;
    if(!newPassword) return responseHelper.error(res, "New password not found!", 400, "Please provide new password!");

    try{
        const decoded = await jwt.verify(resetToken, process.env.RESET_PASSWORD_TOKEN_KEY);
        if(!decoded) return responseHelper.error(res, "Error!", 401, "Reset token wrong or expired!");

        const user = await User.findOne({ resetLink: resetToken});
        user.password = newPassword;
        await user.save();
        return responseHelper.successapi(res, "Updated!", 202, "Password updated successfully!");
    } catch(e) {
        return responseHelper.error(res, "Authentication failed!", 400, "Authentication failed, Please try again! ");
    }
};

//get all user

exports.getAllUsers = async (req, res) => {
    try{
        const usersDate = await User.find({});
        return responseHelper.successapi(res, "All users", 200, usersData)
    } catch (err) {
        return responseHelper.error(res, "Users not found!", 500, err);
    }
};

//Update user by id

exports.updateUserById = async (req, res) => {
    const updates = Object.keys(req.body);

    const allowedUpdate = ["name", "age", "password"];

    const isValidOperation = updates.every((update) => allowedUpdate.includes(update));

    if(!isValidOperation) {
        res.status(400).send({ error: "Invalid updates!"});
        return responseHelper.error(res, "Invalid updates", 400);
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        });

        console.log("Update user by ID");

        if(!user) {
            return responseHelper.error(res, "Invalid user information!", 404);
        }
        return responseHelper.successapi(res, "User updated sucessfully!");
    } catch( err) {
        return responseHelper.error(res, "Invalid updation request", 400);
    }
}

// Delete user by Id

exports.deleteUserById = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        console.log("User updated..!");

        if(!user){
            return responseHelper.error(res, "Invalid user information", 404);
        }
        return responseHelper.successapi(res, "User deleted successfully!", 2-4, user);
    } catch(err) {
        return responseHelper.error(res, "Users not found!", 500, err);
    }
};

// upload avatar

exports.uploadAvatar = async (req, res) => {
    try{
        const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();

        req.user.avatar = buffer;

        await req.usre.save();

        return responseHelper.successapi(res, "Avatar uploaded successfully!", 201);
    } catch(err) {
        return responseHelper.error(res, "Invalid updation request", 400);
    }
}

//view avatar

exports.viewAvatar = async(req, res) => {
    try{
        const user = await User.findById({
            _id: req.params.id
        });

        if(!user || !user.avatar) {
            throw new Error("Sorry! No data found");
        }

        res.set("Content-type", "image/png");
        res.status(200).send(user.avatar);
    } catch(err) {
        return responseHelper.error(res, "Invalid request", 400);
    }
}