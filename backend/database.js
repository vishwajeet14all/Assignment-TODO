const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7977714637@aA#',
    database: 'todos'
});

const connectDb = () => {
    db.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('Mysql database connected successfully');
    });
}

module.exports = { db, connectDb }