const express = require('express');
const createSurvey = require('../controllers/admin/createSurvey');
const getSurvey = require('../controllers/users/getSurvey');
const submitResponse = require('../controllers/users/submitResponse');
const stopSurvey = require('../controllers/admin/stopSurvey');
const viewResponses = require('../controllers/admin/viewResponses');
const signUp = require('../controllers/admin/signUp');
const signIn = require('../controllers/admin/signIn');
const logout = require('../controllers/admin/logout');
const authToken = require('../middlewares/authToken');
const getallSurveys = require('../controllers/admin/getallSurveys');
const deleteSurvey = require('../controllers/admin/deleteSurvey');
const verify = require('../controllers/admin/verify');
const router = express.Router();

// admin signup
router.post('/signup', signUp);

// admin signin
router.post('/login', signIn);

// admin logout
router.post('/logout',authToken, logout);

// create a new Survey (Admin)
router.post('/create',authToken, createSurvey);

// stop survey (Admin)
router.post('/stop/:id',authToken , stopSurvey);

// Get all responses (Admin)
router.get('/responses/:id',authToken ,viewResponses);

// Get all surveys 
router.get('/allsurveys',authToken, getallSurveys);

// delete survey
router.delete('/delete/:id',authToken, deleteSurvey);

// verify user
router.get('/verify', authToken, verify);


// user 
// get survey by Id (Public)
router.get('/:id', getSurvey);

// submit response
router.post('/submit/:id', submitResponse);

module.exports = router;