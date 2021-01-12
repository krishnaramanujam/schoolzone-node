const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.Authorization;
    //Verfiy Token
    try{
      jwt.verify(token,'appwarehouse-app-super-shared-secret');
    }catch(error){
      res.json({message: 'Auth Failed'});
    }
    next();


}
