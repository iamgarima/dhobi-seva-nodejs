function getCurrentDate () {
  var currentDateArr = Date().split(' ')
  var year = currentDateArr[3]
  var month = new Date().getMonth() + 1
  var day = currentDateArr[2]
  return year + '/' + month + '/' + day
}

function getParsedDate (date) {
  return Date.parse(date)
}

function validateCourse (courseName, startDate, endDate, currentDate) {
  if (courseName.length > 0 && endDate > startDate && startDate >= currentDate && courseName !== null) return true
  return false
}

exports.courseDetails = (course) => {
  var startDate = getParsedDate(course.start_date)
  var endDate = getParsedDate(course.end_date)
  var currentDate = getParsedDate(getCurrentDate())
  var courseName = course.course_name.trim()
  return validateCourse(courseName, startDate, endDate, currentDate) ? course : null
}
/*
exports.studentDetails = (student) => {
  if (student.student_name.trim().length > 0 && student.room_number.trim().length > 0 && student.seat_number.trim().length > 0) return student
  return null
}
*/
