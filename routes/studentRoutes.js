const student = require('../controllers/studentController')

const studentRoutes = router => {
  router
    .route('/students/:courseId')
    .get(student.getStudent)
    .post(student.addStudent)
}

module.exports = studentRoutes
