function Student (req) {
  this.courseId = req.body.courseId
  this.studentName = req.body.studentName
  this.roomNumber = req.body.roomNumber
  this.seatNumber = req.body.seatNumber
}

module.exports = {
  Student
}
