const express = require('express');
const router = express.Router();
const courseController = require('../../controller/course');
const isAuth = require('../../middleware/is-auth');
const statusCheck = require('../../middleware/status-check');
const multerMW = require('../../middleware/multer-mw');


// router.post('/',isAuth, statusCheck.isInstructor, courseController.createCourse); // testing Purposes
router.get('/', courseController.getCourses);
router.get('/instructorcourses/:id',isAuth,statusCheck.isInstructor,courseController.getInstructorCourses);
router.get('/studentcourses/:id',isAuth,statusCheck.isStudent,courseController.getStudentCourses);

router.post('/',isAuth,statusCheck.isInstructor,multerMW.upload.single('image'), courseController.createCourse);
router.patch('/takecourse/:id',isAuth, statusCheck.isStudent, courseController.takeCourse);
router.patch('/:id',isAuth, statusCheck.isInstructor, courseController.patchCourse);



module.exports = router;