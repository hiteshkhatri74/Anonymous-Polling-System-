const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

const authToken = async (req, res,next) => {
    try{
        const token = req?.cookies?.token || ( req?.headers?.authorization && req.headers.authorization.split(" ")[1] ) ;

        if(!token){
            return res.status(401).json({
                message : "Please Login",
                error : true,
                success : false
            });
        }

        const decoded = await jwt.verify(token,process.env.JWT_KEY);
        const Admin = await admin.findOne({ email : decoded.email });

        if(!Admin){
            return res.status(403).send({
                message : "You are not authorize",
                error : true,
                success : false
            });
        }

        req.admin = Admin;
        next();
    }
    catch(err){
        res.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = authToken;