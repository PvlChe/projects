export default {
  //******* API SWITCH
  localAPI: false,
  //*******
  signUpStudent: '/api/students/signup',
  signUpInstructor: '/api/instructors/signup',
  logInStudent: '/api/students/login',
  logInInstructor: '/api/instructors/login',
  getStudent: '/api/students/',
  getInstructor: '/api/instructors/',
  //dataInstructor: '/api/instructors/login',
  getCourseStatus: '/api/courses/status/',
  searchCourses: '/api/courses/search/',
  courses: 'api/courses',
  getStartCourses: '/api/courses',
  takeCourse: '/api/auth/courses/takecourse/',
  getCourse: '/api/courses/',
  getStudentAuth: '/api/auth/students/',
  getInstructorAuth: '/api/auth/instructors/',
  getInstructorCourse: '/api/auth/courses/instructorcourses/',
  getStudentCourse: '/api/auth/courses/studentcourses/',
  getLessons: '/api/lessons/ofcourse/',
  createLesson: '/api/auth/lessons',
  updateLesson: '/api/auth/lessons/',
  createCourse: '/api/auth/courses',
  updateCourse: '/api/auth/courses/'
}
