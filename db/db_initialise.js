const pg = require('pg')

let confFile = './db_settings.json'
const setting = require(confFile)
const dbconfig = setting.dbconfig

let conStringPost = 'pg://' + dbconfig.username + ':' + dbconfig.password + '@' + dbconfig.dbhost + ':' + dbconfig.dbport + '/postgres'
let conString = {
  user: dbconfig.username,
  database: dbconfig.dbname,
  password: dbconfig.password,
  host: dbconfig.dbhost,
  port: dbconfig.dbport,
  max: 10,
  idleTimeoutMillis: 30000
}

exports.initialize = function (cb) {
  let client = new pg.Client(conStringPost)
  client.connect(function (err) {
    if (err) cb(err)
    client.query('CREATE DATABASE ' + dbconfig.dbname, function (err) {
      if (err) cb(err)
      client.end(function (err) {
        if (err) cb(err)
        let pool = new pg.Pool(conString)
        pool.connect(function (err, client, done) {
          if (err) cb(err)
          client.query('CREATE TABLE courses(course_id serial PRIMARY KEY,course_name varchar(35), start_date varchar(20), end_date varchar(20))', function (err) {
            if (err) cb(err)
            done()
          })
          client.query('CREATE TABLE students(student_id serial PRIMARY KEY, course_id INTEGER, student_name varchar(35), room_number varchar(5), seat_number varchar(5))', function (err) {
            if (err) cb(err)
            done()
          })
        })
        pool.on('error', function (err, client) {
          console.log(err)
        })
      })
    })
  })
}
