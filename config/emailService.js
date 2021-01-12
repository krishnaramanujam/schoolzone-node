//Import NPM
const nodemailer = require('nodemailer');

//Configuring Gmail Service
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'undestroyable.ap@gmail.com',
        pass: 'aphackap'
    }
});


//exporting variable to other files
module.exports = transporter;
