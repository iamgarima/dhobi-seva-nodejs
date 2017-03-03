const db = require('../db')
const models = require('../models/student')
const StudentDetails = models.Student

const student = {}

student.addStudent = (req, res) => {
  let studentDetailsObj = new StudentDetails(req)
  db.addStudent(studentDetailsObj, function (validStudent) {
    if (validStudent) res.send(validStudent)
    else res.status(500).send('ERROR')
  })
}

student.getStudent = (req, res) => {
  db.getStudent(req.body.course_id, function (listOfStudents) {
    if (listOfStudents.length > 0) res.send(listOfStudents)
    else res.status(500).send('ERROR')
  })
}

module.exports = student
