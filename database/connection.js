const mysql = require('mysql')
const { VARCHAR, TIMESTAMP } = require('mysql/lib/protocol/constants/types')


const DB = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
})

DB.connect((err) => {
    if (!err) {
        console.log('connected to database!!')
        DB.query('SELECT * FROM blogs', (err, result) => {
            if (err) {

                console.log('creating table.......')

                DB.query(`CREATE TABLE blogs(
                    id int auto_increment primary key not null,
                    title VARCHAR(60) not null,
                    img_url TEXT not null,
                    description VARCHAR(100) not null,
                    created_at TIMESTAMP default CURRENT_TIMESTAMP
                )`)
                console.log('TABLE blogs created succesfully!!')
            } else {
                console.log('table already exists')
            }
        })
    } else {
        console.log('connection failed')
    }
})


module.exports = DB;