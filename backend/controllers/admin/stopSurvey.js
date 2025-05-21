const Survey = require("../../models/Survey");

const stopSurvey = async (req, res) => {
    try{
        const surveyId = req?.params?.id;
        const survey = await Survey.findById(surveyId);
        const admin = req?.admin?._id;

        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found',
                success: false,
                error: true
            });
        }

        if(!survey){
            return res.status(404).json({
                message : 'Survey not Found',
                success : false,
                error : true
            });
        }

        if(survey.admin.toString() !== admin.toString()){
            return res.status(403).json({
                message : "You are not authorize",
                error : true,
                success : false
            });
        }

        if(survey.status === 'stopped'){
            return res.status(400).json({
                message : 'Survey is Already Stopped',
                success : false,
                error : true
            });
        }

        survey.status = 'stopped';
        await survey.save();

        res.status(200).json({
            message : 'Survey stopped successfully',
            data : survey,
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(500).json({
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = stopSurvey;