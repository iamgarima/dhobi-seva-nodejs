const pg = require('pg')
const validate = require('./validate')
const db = require('./db_initialise')
let confFile = './db_settings.json'
const setting = require(confFile)
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
  if (validate.courseDetails(course)) {
    db.init(function (ob) {
      ob.Courses.create(course).then(function (m) {
        course.course_id = m.dataValues.id
      })
    })
    cb(course)
  } else {
    console.log('Invalid input format')
    cb(null)
  }
}

exports.getCourse = (cb) => {
  db.init(function (ob) {
    ob.Courses.findAll().then(function (course) {
      var courses = course.map(function (course) {
        return course.dataValues
      })
      cb(courses)
    })
  })
}

exports.addStudent = (student, cb) => {
  if (validate.studentDetails(student)) {
    db.init(function (ob) {
      ob.Students.create(student).then(function (m) {
        student.student_id = m.dataValues.id
      })
    })
    cb(student)
  } else {
    console.log('Invalid input format')
    cb(null)
  }
}

exports.getStudent = (course_id, cb) => {
  db.init(function (ob) {
    ob.Students.findAll({where: {course_id: course_id}}).then(function (student) {
      var students = student.map(function (student) {
        return student.dataValues
      })
      console.log(students)
      cb(students)
    })
  })
}
