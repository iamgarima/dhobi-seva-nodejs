(function(window, $){
  window.dsn = window.dsn || {};
  const uri = 'http://localhost:3000/api/v1';
  $(window.document).ready(function () {
    getCourse()
    $('.modal').modal()
    $('.datepicker').pickadate({
     selectMonths: true,
     selectYears: 15
    })
    $('#createCourse').click(createCourse)
  })

  function createCourse () {
    let validate = window.dsn.validate;
    let courseDetails = validate.courseDetails($('#course_name').val(), $('#start_date').val(), $('#end_date').val())
    if (courseDetails === null) {
      alert('Invalid input')
    } else {
    let [courseName, startDate, endDate] = courseDetails
    $.ajax({
      url: `${uri}/courses`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        'course_name': courseName,
        'start_date': startDate,
        'end_date': endDate
      })
    })
    .then(function (res) {
      $('#course_name').val(''),
      $('#start_date').val(''),
      $('#end_date').val('')
      appendCourse(res)
      $('.modal').modal('close')
    })
    .catch(function (err) {

    })
  }
  }

  function getCourse() {
    $.ajax({
      url: `${uri}/courses`,
      dataType: 'json',
      success: function (res) {
        res.forEach(function (course) {
          appendCourse(course)
        })
      }
    })
  }

  function appendCourse(course) {
    const card = `
      <div class="col s6 m3">
        <div class="card blue-grey darken-1 small">
          <div class="card-content white-text">
            <span class="card-title card-title-style">${course.course_name}</span>
            <hr>
            <p class="start-date-style">${course.start_date}</p>
            <p class="end-date-style">${course.end_date}</p>
          </div>
          <div class="card-action course-action">
            <div class="col s6 center-align">
              <a href="#students">Open</a>
            </div>
            <div class="col s6 center-align">
              <a href="#">End</a>
            </div>
          </div>
        </div>
      </div>
    `
    $('#courses').append(card)
  }
})(window, $);
