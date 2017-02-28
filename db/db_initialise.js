const pg = require('pg')

let confFile = './db_settings.json'
const setting = require(confFile)
const dbconfig = setting.dbconfig

let conString = 'pg://' + dbconfig.username + ':' + dbconfig.password + '@' + dbconfig.dbhost + ':' + dbconfig.dbport + '/' + dbconfig.dbname
let conStringPost = 'pg://' + dbconfig.username + ':' + dbconfig.password + '@' + dbconfig.dbhost + ':' + dbconfig.dbport + '/postgres'

let client

const db = {}

db.initialize = function (cb) {
  client = new pg.Client(conStringPost)
  client.connect(function (err) {
    if (err) {
      console.log('error connecting to pg db')
      cb(err)
    } else {
      client.query('CREATE DATABASE ' + dbconfig.dbname, function (err) {
        if (err) {
          console.log('error creating custom db')
          cb(err)
        } else {
          client.end(function (err) {
            if (err) {
              console.log('error ending connection pg')
              cb(err)
            } else {
              client = new pg.Client(conString)
              client.connect(function (err) {
                if (err) {
                  console.log('error connecting to custom db')
                  cb(err)
                } else {
                  client.query('CREATE TABLE courses(courseId serial PRIMARY KEY,courseName varchar(35), startDate varchar(20), endDate varchar(20))', function (err, result) {
                    if (err) {
                      console.log('table creation error')
                      cb(err)
                    } else {
                      client.query('CREATE TABLE students(studentId varchar(35), courseId INTEGER, studentName varchar(35), roomNumber varchar(5), seatNumber varchar(5))')
                      console.log('Table creation successful')
                      client.end(function (err) {
                        if (err) {
                          console.log('error ending connection')
                          cb(err)
                        } else {
                          console.log('connection 2 closed successfully')
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports = db
