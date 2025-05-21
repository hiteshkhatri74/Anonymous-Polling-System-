const Survey = require("../../models/Survey");

const getSurvey = async ( req,res ) => {
    try{
        const surveyId = req?.params?.id;
        const survey = await Survey.findById(surveyId);

        if(!survey){
            return res.status(404).json({
                message : "Survey not Found",
                success : false,
                error : true
            });
        }

        res.status(200).json({
            message : "Survey Found",
            data : survey,
            success : true,
            error : false,
        });
    }
    catch(err) {
        res.staus(500).json({
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = getSurvey;