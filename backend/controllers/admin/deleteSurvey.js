const Survey = require("../../models/Survey");

const deleteSurvey = async (req , res) => {
    try{
        const id = req?.params?.id;
        const survey = await Survey.findById(id);
        const adminId = req?.admin?._id;

        if (!adminId) {
            return res.status(404).json({
                message: 'Admin not found',
                success: false,
                error: true
            });
        }

        if(!survey){
            return res.status(404).json({
                message : "Survey not Found",
                error : true,
                success : false
            });
        }

        await survey.deleteOne();

        res.status(200).json({
            message : "Survey Deleted Successfully",
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

module.exports = deleteSurvey;