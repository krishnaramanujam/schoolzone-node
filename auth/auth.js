const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

//Database Connection
let database = require('../config/database');

//Auth Token
const checkauth = require('./check-auth');

// App SignIN Details Check
router.post('/staff/signin', (req, res, next) => {

    const ReqData = req.body;
    const loginUsername = ReqData.username;    const loginPassword = ReqData.password;
    
    const LoginCheck = database.query('SELECT user_stafflogin.* FROM `user_stafflogin` WHERE user_stafflogin.login_Id = ? limit 1', [loginUsername], (err, rows, fields) => {
  

      if(err) {
        res.status(200)
           .json({message: 'Failed to Login', flag: 'false'});
      }else{
        const match_row = rows.length;
        if(match_row > 0){

          //checking BCRYPT PASSWORD HERE
          

          //jwt token
          const token = jwt.sign({Username: loginUsername, userId: rows[0].Id},'appwarehouse-app-super-shared-secret',{expiresIn: '8h' });
    
          res.status(200)
             .json({message: 'Successfully Login', flag: 'true', token: token, tokenTimer: 3600, staffAccessCode: rows[0].staff_access_code, UserName: rows[0].login_Id});
        }else {
          res.status(200)
             .json({message: 'Failed to Login', flag: 'false'});
        }
    
    
      }
  
      
    });

  

});// signin Details Close

// App userLoginDetails
router.get('/userLoginDetails', (req, res, next) => {

  database.query('SELECT * FROM user_stafflogin', (err, rows, fields) => {

    const match_row = rows.length;

    //CHECK BCRYPT PASSWORD HERE

    if(match_row > 0){
      res.status(200)
         .json({message: 'User Exists', flag: 'true', Users: rows});
    }else {
      res.status(200)
         .json({message: 'No User Found', flag: 'false'});
    }


  });


});// signin Details Close

// Page Access ------------------------------------------------------------------------------------------------------------
router.get('/navbar_page_access', (req, res, next) => {

  const token = req.headers.authorization;
  const decoded = jwt.verify(token, 'appwarehouse-app-super-shared-secret');
  const user_Id = decoded.userId;

  const AccessListQuery = database.query('SELECT `user_pageaccess`.`function_id` FROM `app_login` LEFT JOIN `user_pageaccess` on `app_login`.`Id`=`user_pageaccess`.`user_id` WHERE `app_login`.`Id`= ?', [user_Id], (err, rows, fields) => {

    const page_length = rows.length;

    if(page_length > 0){
      res.status(200)
         .json({message: 'Access Links Found', flag: 'true', userAccessLink: rows});
    }else {
      res.status(200)
         .json({message: 'You Dont Have Access Please Contact To Admin', flag: 'false'});
    }

  });


});
// Close Page Access ------------------------------------------------------------------------------------------------------------

module.exports = router;

