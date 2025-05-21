const Survey = require("../../models/Survey");

const getallSurveys = async (req,res) => {
    try{
        const adminId = req?.admin?._id;

        if(!adminId){
            return res.status(400).json({
                message : "Something went wrong",
                error : true,
                success : false
            });
        }

        const allSurveys = await Survey.find({ admin : adminId}) || [];

        res.status(200).json({
            message : "Successfully find all surveys",
            data : allSurveys,
            success : true,
            error : false
        });
    }
    catch (err){
        res.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = getallSurveys;