const express = require('express');
const router = express.Router();
const courseController = require('../controller/course');


router.get('/', courseController.getCourses);
router.get('/search/:id', courseController.searchCourses);

router.get('/:id', courseController.getCourse);
router.post('/', courseController.createCourse);
router.post('/status/:id', courseController.checkCourseStatus);

module.exports = router;