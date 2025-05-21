const verify = (req, res) => {
    try{
        const admin = req?.admin?._id;

        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found',
                success: false,
                error: true
            });
        }
        
        res.status(200).json({
            authorized : true,
            message : "User is authorized",
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(500).json({
            authorized : false,
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = verify;