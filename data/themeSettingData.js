'use strict';

const config = require('../config');
const sql = require('mssql');


const getRouteThemedata = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `
        SELECT * FROM [dbo].[ROUTE_THEME] WHERE IsActive=1
  `;

        const result = await pool
            .request()
            .query(query);
        return result.recordset;
    } catch (err) {
        return err.message;
    }
};

const addRouteThemeData = async (record) => {
    try {
        console.log("dataPatient:", record);
        let pool = await sql.connect(config.sql);
        let query = `
        INSERT INTO [dbo].[ROUTE_THEME] (
            [ROUTE_NAME],
            [HEADER_BACKGROUND_COLOR],
            [HEADER_FONT_COLOR],
            [FOOTER_BACKGROUND_COLOR],
            [FOOTER_FONT_COLOR],
            [CREATED_BY],
            [CREATED_ON],
            [IsActive]
        ) VALUES (
            @routeName,
            @headerBackgroundColor,
            @headerFontColor,
            @footerBackgroundColor,
            @footerFontColor,
            @createdBy,
            @createdOn, 
            1          
        );`;
        const result = await pool
            .request()
            .input('routeName', sql.VarChar, record.routeName)
            .input('headerBackgroundColor', sql.VarChar, record.headerBackgroundColor)
            .input('headerFontColor', sql.VarChar, record.headerFontColor)
            .input('footerBackgroundColor', sql.VarChar, record.footerBackgroundColor)
            .input('footerFontColor', sql.VarChar, record.footerFontColor)
            .input('createdBy', sql.VarChar, record.createdBy)
            .input('createdOn', sql.DateTime, new Date())
            .query(query);
        return result.recordset;
    } catch (err) {
        return err.message;
    }
}
const updatePatientList = async (record) => {
    try {
        console.log("dataPatient:", record);
        let pool = await sql.connect(config.sql);
        let query = `
        UPDATE [dbo].[PATIENT_RECORD]
        SET
            [NAME] = @name,
            [EMAIL] = @email,
            [MOBILE] = @mobile,
            [GENDER] = @gender,
            [HEIGHT] = @height,
            [WEIGHT] = @weight,
            [PROBLEM] = @problem,
            [DEPARTMENT] = @department,
            [DOCTOR] = @doctor,
            [VISIT_DATE] = @visitDate,
            [VISIT_TIME] = @visitTime,
            [LAST_VISIT_DATE] = @lastVisitDate,
            [HOSPITAL_NAME] = @hospitalName,
            [ADDRESS] = @address,
            [UPDATED_BY] = @updatedBy,
            [UPDATED_ON] = @updatedOn
            WHERE [RECORD_ID] = @recordID;
        `;
        const result = await pool
            .request()
            .input('recordID', sql.VarChar, record.RECORD_ID)
            .input('name', sql.VarChar, record.NAME)
            .input('email', sql.VarChar, record.EMAIL)
            .input('mobile', sql.VarChar, record.MOBILE)
            .input('gender', sql.VarChar, record.GENDER)
            .input('height', sql.VarChar, record.HEIGHT)
            .input('weight', sql.VarChar, record.WEIGHT)
            .input('problem', sql.VarChar, record.PROBLEM)
            .input('department', sql.VarChar, record.DEPARTMENT)
            .input('doctor', sql.VarChar, record.DOCTOR)
            .input('visitDate', sql.DateTime, new Date(record.VISIT_DATE))
            .input('visitTime', sql.Time, record.VISIT_TIME)
            .input('lastVisitDate', sql.DateTime, new Date(record.LAST_VISIT_DATE))
            .input('hospitalName', sql.VarChar, record.HOSPITAL_NAME)
            .input('address', sql.VarChar, record.ADDRESS)
            .input('updatedBy', sql.VarChar, record.UPDATED_BY)
            .input('updatedOn', sql.DateTime, new Date())
            .query(query);

        return result.recordset;
    } catch (err) {
        return err.message;
    }
}
module.exports = {
     addRouteThemeData,getRouteThemedata
};
