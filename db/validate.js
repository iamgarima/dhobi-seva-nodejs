exports.courseDetails = (course) => {
  var start_m = Date.parse(course.start_date)
  var end_m = Date.parse(course.end_date)
  var name_m = course.course_name.trim()
  var currentDateArr = Date().split(' ')
  var newCurrentDate = currentDateArr[3] + '/' + (new Date().getMonth() + 1) + '/' + currentDateArr[2]
  var newCurrentDate_m = Date.parse(newCurrentDate)
  if (name_m.length > 0 && end_m > start_m && start_m >= newCurrentDate_m && name_m !== null) return course
  return null
}

exports.studentDetails = (student) => {
  if (student.student_name.trim().length > 0 && student.room_number.trim().length > 0 && student.seat_number.trim().length > 0) return student
  return null
}
