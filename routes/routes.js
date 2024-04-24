const express = require('express');
const { userLogin } = require('../controllers/userController');
const { patientList, patientFactorController, updatePatientFactorListController, updatePatientListController, filterPatientListController, insertPatientController } = require('../controllers/patientController');
const { addRouteThemeController, getRouteTheme } = require('../controllers/themeSettingController');
const router = express.Router();

//Get all option route
router.get('/patientList', patientList)
module.exports = router;