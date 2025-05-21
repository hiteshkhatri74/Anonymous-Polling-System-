const calculateResults = require("../../components/calculateResults");
const Survey = require("../../models/Survey");

const submitResponse = async (req, res) => {
    try{
        const surveyId = req?.params?.id;
        const { option } = req?.body;
        const ip = req?.ip;
        const survey = await Survey.findById(surveyId);

        if(!survey){
            return res.status(404).json({
                message : "Survey not Fount",
                success : false,
                error : true
            });
        }

        if(survey.status === 'stopped') {
            return res.status(400).json({
                message : 'Survey is Stopped',
                success : false,
                error : true
            });
        }

        const alreadyResponded = survey.responses.find(r => r.ip === ip);
        if(alreadyResponded){
            return res.status(400).json({
                message : 'You have already responded',
                success : false,
                error : true
            });
        }

        survey.responses.push({ option,ip });
        await survey.save();
        const results = calculateResults(survey);

        const io = req.app.get('io');
        io.to(surveyId).emit('new_response', { 
               surveyId: surveyId,
               results: results
        });

        res.status(200).json({
            message : 'Response submitted successfully',
            data : survey,
            success : true,
            error : false
        });
    }
    catch (err) {
        res.status(500).json({
            message : err.message || err,
            success : false,
            error : true
        });
    }
}

module.exports = submitResponse;