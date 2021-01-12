const mysql = require('mysql');

//FOR LIVE SERVER CONFIG
const con = mysql.createConnection({
  host: '173.248.130.27',
  user: 'siws',
  password: 'kKgnpqSViksbhHDU',
  database: 'mydb',
  multipleStatements : true
});

//FOR LOCALHOST CONFIG
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'app-warehouse',
//   multipleStatements : true
// });

con.connect(function(err){
  if(err) throw err;
  console.log('Database Connected!');
});

//exporting variable to other files
module.exports = con;
