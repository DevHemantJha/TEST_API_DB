'use strict';

const config = require('../config');
const sql = require('mssql');

const loginUser = async (username) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('username', sql.VarChar, username)
      // .input('password', sql.VarChar, password)
      .execute('USP_USER_Login');
    return result.recordset;
  } catch (err) {
    return err.message;
  }
};
const InsertUserRoleData = async (userId) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('userId', sql.BigInt, userId)
      .execute('USP_Update_User_List');
    return result.recordset;
  } catch (err) {
    return err.message;
  }
};
const viewControlData = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('ROLE_ID', sql.INT, id)
      .execute('USP_Automation_request_View_control');
    return result.recordset;
  } catch (err) {
    return err.message;
  }
};

const roleControlData = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().execute('Usp_GetRoleMaster');
    return result.recordset;
  } catch (err) {
    return err.message;
  }
};

const changeValue = async (body) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('access_value', sql.Bit, body.access_value)
      .input('role_id', sql.Int, body.role_id)
      .input('control_name', sql.VarChar, body.control_name)
      .execute('Usp_ChangeAccessValueRole');
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  loginUser,
  viewControlData,
  changeValue,
  roleControlData,
  InsertUserRoleData
};
