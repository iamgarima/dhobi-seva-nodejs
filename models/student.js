function Student (req) {
  this.course_id = req.body.course_id
  this.student_name = req.body.student_name
  this.room_number = req.body.room_number
  this.seat_number = req.body.seat_number
}

module.exports = {
  Student
}
