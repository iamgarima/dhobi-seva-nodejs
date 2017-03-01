function Course (req) {
  this.course_name = req.body.course_name
  this.start_date = req.body.start_date
  this.end_date = req.body.end_date
}

module.exports = {
  Course
}
