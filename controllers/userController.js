'use strict';

const { loginUser, viewControlData, roleControlData, changeValue ,InsertUserRoleData} = require('../data/user');

const userLogin = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await loginUser(username);
    console.log(user)
    res.cookie('id', user[0].ID);
    res.cookie('role', user[0].ROLE_NAME);
    res.cookie('mail', user[0].MAIL);
    res.cookie('role_id', user[0].ROLE_ID);
    res.cookie('name', user[0].FIRSTNAME + ' ' + user[0].LASTNAME);
    res.status(200).json({ user: user[0], message: 'Login Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
const InsertUserRole = async (req, res, next) => {
  const { userId ,username} = req.body;
  try {
    const user = await InsertUserRoleData(userId);
    const updatedUser = await loginUser(username);
    res.status(200).json({ role_id: updatedUser[0].ROLE_ID });
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};

const viewControl = async (req, res) => {
  try {
    const { id } = req.params;
    const view = await viewControlData(id);
    res.status(200).json(view);
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};

const roleControl = async (req, res) => {
  try {
    const view = await roleControlData();
    res.status(200).json(view);
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};

const updateControl = async (req, res) => {
  try {
    const change_value = await changeValue(req.body);
    console.log(req.body);
    res.status(200).json({ message: 'Value Updated' });
  } catch (error) {
    res.status()(400).json({ message: 'Something Wrong' });
  }
};

module.exports = { userLogin, viewControl,roleControl, updateControl ,InsertUserRole};
