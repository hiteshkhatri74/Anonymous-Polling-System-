const Survey = require("../../models/Survey");
const calculateResults = require('../../components/calculateResults');

const viewResponses = async (req, res) => {
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
            return res.status(401).json({
                message : "You are not authorize",
                error : true,
                success : false
            });
        }

        const results = calculateResults(survey);

        res.status(200).json({
            message : 'Survey results find successfully',
            data : results,
            success : true,
            error : false
        })
    }
    catch (err){
        res.status(500).json({
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = viewResponses;