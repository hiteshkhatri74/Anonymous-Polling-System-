const Survey = require("../../models/Survey");

const createSurvey = async (req, res) => {
    try{
        const {question, options } = req?.body;
        const adminId = req?.admin?._id;

        if(!question || options.length === 0){
            return res.status(400).json({
                message : 'Please validate inputs',
                success : false,
                error : true
            });
        }

        if (!adminId) {
            return res.status(404).json({
                message: 'Admin not found',
                success: false,
                error: true
            });
        }
        
        const newSurvey = new Survey({ question, options, admin : adminId});
        await newSurvey.save();

        res.status(201).json({
            message : 'Survey created Successfully',
            data : newSurvey,
            success : true,
            error : false
        });
    }
    catch(err) {
        res.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

module.exports = createSurvey;