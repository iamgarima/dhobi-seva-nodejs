const db = require('../db')
const models = require('../models/student')
const StudentDetails = models.Student

const student = {}

student.addStudent = (req, res) => {
  let studentDetailsObj = new studentDetails(req)
  db.addStudent(studentDetailsObj, function (validStudent) {
    if (validStudent) res.send(validStudent)
    else res.status(500).send('ERROR')
  })
}

student.getStudent = (req, res) => {
  db.getStudent(function (listOfStudents) {
    if (listOfStudents.length > 0) res.send(listOfStudents)
    else res.status(500).send('ERROR')
  })
}

module.exports = student
