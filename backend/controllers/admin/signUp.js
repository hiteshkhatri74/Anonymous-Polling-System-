const bcrypt = require('bcryptjs');
const generateToken = require("../../components/generateToken");
const admin = require("../../models/admin");

const signUp = async (req,res) => {
    try{
        const { name , email, password } = req?.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message : "please fill out inputs",
                error : true,
                success : false
            });
        }

        const Existinguser = await admin.findOne({email : email});

        if(Existinguser){
            return res.status(400).json({
                message : "You have already have an account , Please Login",
                error : true,
                success : false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await  bcrypt.hash(password,salt);

        if(!hashPassword) {
            return res.status(500).json({
                message : err.message || err,
                error : true,
                success : false
            });
        }

        const user = await admin.create({
            name,
            email,
            password : hashPassword
        });

        const token = generateToken(user);
        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
            maxAge: 24 * 60 * 60 * 1000 
        }

        res.cookie('token',token, tokenOption);

        res.status(201).send({
            message : "Admin created successfully",
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = signUp;