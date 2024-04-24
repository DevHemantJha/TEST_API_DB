'use strict';
const { patientListData, patientFactorData, updatePatientFactorList, updatePatientList, filterPatientListData, insertPatient } = require("../data/patientData");

const patientList = async (req, res, next) => {
  try {
    const user = await patientListData();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
const patientFactorController = async (req, res, next) => {
  try {
    const { USER_ID } = req.query
    const user = await patientFactorData(USER_ID);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
const updatePatientListController = async (req, res, next) => {
  try {
    console.log("updatePatientListController", req.body);
    const user = await updatePatientList(req.body);
    res.status(200).json({ message: 'Updated Successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
const updatePatientFactorListController = async (req, res, next) => {
  try {
    console.log("updatePatientFactorListController", req.body);
    const user = await updatePatientFactorList(req.body);
    res.status(200).json({ message: 'Updated Successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
const filterPatientListController = async (req, res, next) => {
  try {
    const { startDate, endDate, hospitalName } = req.query
    console.log("req.query", req.query);
    const user = await filterPatientListData(startDate, endDate, hospitalName);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
const insertPatientController = async (req, res, next) => {
  try {
    console.log("insertPatientController", req.body);
    const user = await insertPatient(req.body);
    res.status(200).json({ message: 'Updated Successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
module.exports = { patientList, patientFactorController, updatePatientListController, updatePatientFactorListController, filterPatientListController, insertPatientController };
