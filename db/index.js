const pg = require('pg')
let confFile = './db_settings.json'
const setting = require(confFile)
const validate = require('./validate')

const dbconfig = setting.dbconfig

let conString = {
  user: dbconfig.username,
  database: dbconfig.dbname,
  password: dbconfig.password,
  host: dbconfig.dbhost,
  port: dbconfig.dbport,
  max: 10,
  idleTimeoutMillis: 30000
}

let pool = new pg.Pool(conString)

pool.connect(function (err, client, done) {
  if (err) {
    if (err.code === '3D000') {
      console.log('Database does not exist, creating custom db')
      const db = require('./db_initialise')
      db.initialize(function (err) {
        console.log(err)
      })
    } else if (err) {
      console.log(err)
    }
  }
  done()
})

exports.createCourse = (course, cb) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log(err)
      cb(null)
    }
    if (validate.courseDetails(course)) {
      client.query("INSERT INTO courses (course_name, start_date, end_date) VALUES ('"+course.course_name+"', '"+course.start_date+"', '"+course.end_date+"') RETURNING course_id", function (err, result) {
        if (err) cb(null)
        course.course_id = result.rows[0].course_id
        done()
        cb(course)
      })
    } else {
      console.log('Error')
      cb(null)
    }
  })
}

exports.getCourse = (cb) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log(err)
      cb(null)
    }
    client.query('SELECT * FROM courses', function (err, result) {
      done()
      if (err) {
        console.log(err)
        cb(null)
      }
      cb(result.rows)
    })
  })
}

exports.addStudent = (student, cb) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log(err)
      cb(null)
    }
    if (validate.studentDetails(student)) {
      client.query("INSERT INTO students (course_id, student_name, room_number, seat_number) VALUES ('"+student.student_name+"', '"+student.room_number+"', '"+student.seat_number+"') RETURNING student_id", function (err, result) {
        if (err) cb(null)
        student.student_id = result.rows[0].student_id
        done()
        cb(student)
      })
    } else {
      console.log('Error')
      cb(null)
    }
  })
}

exports.getStudent = (cb) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log(err)
      cb(null)
    }
    client.query('SELECT * FROM students', function (err, result) {
      done()
      if (err) {
        console.log(err)
        cb(null)
      }
      cb(result.rows)
    })
  })
}
pool.on('error', function (err, client) {
  console.log(err)
})
