
'use strict';

const { addRouteThemeData, getRouteThemedata } = require("../data/themeSettingData");

const getRouteTheme = async (req, res, next) => {
  try {
    const user = await getRouteThemedata();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Something wrong' });
  }
};
// const patientFactorController = async (req, res, next) => {
//     try {
//         const{USER_ID}=req.query
//       const user = await patientFactorData(USER_ID);
//       res.status(200).json(user);
//     } catch (err) {
//       res.status(400).json({ message: 'Something wrong' });
//     }
//   };
  const addRouteThemeController = async (req, res, next) => {
    try {
    console.log("addRouteThemeData",req.body);
      const user = await addRouteThemeData(req.body);
      res.status(200).json({ message: 'Added Successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Something wrong' });
    }
  };
module.exports = {addRouteThemeController,getRouteTheme};
