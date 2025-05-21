const bcrypt = require('bcryptjs');
const admin = require("../../models/admin");
const generateToken = require('../../components/generateToken');

const signIn = async (req,res) => {
    try{
        const { email, password } = req?.body;

        // check both inputs filled or not
        if(!email || !password){
            return res.status(400).json({
                message : "Please fill out inputs",
                error : true,
                success : false
            });
        }

        const user = await admin.findOne({ email : email });

        // user not find
        if(!user){
            return res.status(400).json({
                message : "Email or Password incorrect",
                error : true,
                success : false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message : 'Email or Password incorrect',
                error : true,
                success : false
            });
        }

        const token = generateToken(user);
        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
            maxAge: 24 * 60 * 60 * 1000 
        }

        res.cookie('token',token,tokenOption);

        res.status(200).json({
            message : "Login successfully",
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

module.exports = signIn;