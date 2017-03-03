const pg = require('pg')
var Sequelize = require('sequelize')
let confFile = './db_settings.json'
const setting = require(confFile)
const dbconfig = setting.dbconfig

let conStringPost = 'pg://' + dbconfig.username + ':' + dbconfig.password + '@' + dbconfig.dbhost + ':' + dbconfig.dbport + '/postgres'

exports.initialize = (cb) => {
  let client = new pg.Client(conStringPost)
  client.connect(function (err) {
    if (err) cb(err)
    client.query('CREATE DATABASE ' + dbconfig.dbname, function (err) {
      if (err) cb(err)
      client.end(function (err) {
        if (err) console.log(err)
      })
    })
  })
}

exports.init = (cb) => {
  var sequelize = new Sequelize(dbconfig.dbname, dbconfig.username, dbconfig.password, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  })

  sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.')
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err)
  })
  var ob = {}
  ob.Courses = sequelize.define('course', {
    course_name: {
      type: Sequelize.STRING
    },
    start_date: {
      type: Sequelize.STRING
    },
    end_date: {
      type: Sequelize.STRING
    }
  })

  ob.Courses.sync({force: false}).then(function () {
  // Table created
    return
  })

  ob.Students = sequelize.define('student', {
    course_id: {
      type: Sequelize.INTEGER
    },
    student_name: {
      type: Sequelize.STRING
    },
    room_number: {
      type: Sequelize.STRING
    },
    seat_number: {
      type: Sequelize.STRING
    }
  })

  ob.Students.sync({force: false}).then(function () {
  // Table created
    return
  })
  .then(cb(ob))
}
