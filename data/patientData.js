'use strict';

const config = require('../config');
const sql = require('mssql');


const patientListData = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `
        SELECT * FROM [dbo].[PATIENT_RECORD] WHERE [IsActive] = 1 
  `;

        const result = await pool
            .request()
            .query(query);
        return result.recordset;
    } catch (err) {
        return err.message;
    }
};
const filterPatientListData = async (startDate, endDate, hospitalName) => {
    try {
        let parsedEndDate = '3000-12-31';
        let parsedStartDate = '1947-08-15';
        let pool = await sql.connect(config.sql);
        let query = `
        SELECT * FROM [dbo].[PATIENT_RECORD] WHERE [IsActive] = 1 
        `;

        if (startDate !== 'undefined' && startDate !== undefined && startDate !== null && startDate != '') {
            parsedStartDate = new Date(startDate);
            query = query + ` AND [LAST_VISIT_DATE] >= @startDate`;
        }

        if (endDate !== 'undefined' && endDate !== undefined && endDate !== null && endDate != '') {
            parsedEndDate = new Date(endDate);
            query += ` AND [LAST_VISIT_DATE] <= @endDate`;
        }

        if (hospitalName !== 'undefined' && hospitalName !== undefined && hospitalName !== null && hospitalName != '') {
            query += ` AND [HOSPITAL_NAME] = @hospitalName`;
        }
        const result = await pool
            .request()
            .input('hospitalName', sql.VarChar, hospitalName)
            .input('startDate', sql.DateTime, parsedStartDate)
            .input('endDate', sql.DateTime, parsedEndDate)
            .query(query);
        return result.recordset;
    } catch (err) {
        return err.message;
    }
};


const patientFactorData = async (USER_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = `
            SELECT * FROM [dbo].[PATIENT_FACTOR] 
            WHERE [IsActive] = 1 
        `;
        if (USER_ID.trim() != '') {
            query += ` AND [PATIENT_ID] = '${+USER_ID}'`;
        }
        const result = await pool
            .request()
            .query(query);
        return result.recordset;
    } catch (err) {
        return err.message;
    }
};


const updatePatientFactorList = async (record) => {
    try {
        console.log("dataFactor:", record);
        let pool = await sql.connect(config.sql);
        let query = `
        UPDATE [dbo].[PATIENT_FACTOR]
        SET
            [POST_NATAL_CARE] = @postNatalCare,
            [FAMILY_PLANNING] = @familyPlanning,
            [INJETABLE] = @injectable,
            [NORPLANT] = @norplant,
            [FEMALE_CONDOM] = @femaleCondom,
            [MALE_CONDOM] = @maleCondom,
            [STERILIZATION] = @sterilization,
            [CERVICAL_CANCER_SCREENING] = @cervicalCancerScreening,
            [IMMUNIZATION] = @immunization,
            [HIV_TB] = @hivTB,
            [OPPORTUNISTIC_INFECTION] = @opportunisticInfection,
            [FORCASTED_FLG] = @forecastedFlg,
            [UPDATED_BY] = @updatedBy,
            [UPDATED_ON] = @updatedOn
        WHERE [FACTOR_ID] = @factorID;
        `;
        const result = await pool
            .request()
            .input('postNatalCare', sql.Char, record.POST_NATAL_CARE)
            .input('familyPlanning', sql.Char, record.FAMILY_PLANNING)
            .input('injectable', sql.Char, record.INJETABLE)
            .input('norplant', sql.Char, record.NORPLANT)
            .input('femaleCondom', sql.Char, record.FEMALE_CONDOM)
            .input('maleCondom', sql.Char, record.MALE_CONDOM)
            .input('sterilization', sql.Char, record.STERILIZATION)
            .input('cervicalCancerScreening', sql.Char, record.CERVICAL_CANCER_SCREENING)
            .input('immunization', sql.Char, record.IMMUNIZATION)
            .input('hivTB', sql.Char, record.HIV_TB)
            .input('opportunisticInfection', sql.Char, record.OPPORTUNISTIC_INFECTION)
            .input('forecastedFlg', sql.Char, record.FORCASTED_FLG)
            .input('updatedBy', sql.VarChar, record.UPDATED_BY)
            .input('updatedOn', sql.DateTime, new Date())
            .input('factorID', sql.BigInt, record.FACTOR_ID)
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
const insertPatient = async (record) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = `
        INSERT INTO [dbo].[PATIENT_RECORD] (
            [NAME], 
            [EMAIL], 
            [MOBILE], 
            [GENDER], 
            [HEIGHT], 
            [WEIGHT], 
            [PROBLEM], 
            [DEPARTMENT], 
            [DOCTOR], 
            [VISIT_DATE], 
            [VISIT_TIME], 
            [LAST_VISIT_DATE], 
            [HOSPITAL_NAME], 
            [ADDRESS], 
            [CREATED_BY], 
            [CREATED_ON]
        ) 
        VALUES (
            @name, 
            @email, 
            @mobile, 
            @gender, 
            @height, 
            @weight, 
            @problem, 
            @department, 
            @doctor, 
            @visitDate, 
            @visitTime, 
            @lastVisitDate, 
            @hospitalName, 
            @address, 
            @createdBy, 
            @createdOn
        );
        `;
        const result = await pool
            .request()
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
            .input('createdBy', sql.VarChar, record.CREATED_BY)
            .input('createdOn', sql.DateTime, new Date())
            .query(query);

        return result.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    patientListData, patientFactorData, updatePatientFactorList, updatePatientList, filterPatientListData, insertPatient
};
