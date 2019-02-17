const express = require('express');
const router = express.Router();
const lessonController = require('../controller/lesson');


router.get('/ofcourse/:id',lessonController.getLessons);
router.get('/:id', lessonController.getOneLesson);

module.exports = router;