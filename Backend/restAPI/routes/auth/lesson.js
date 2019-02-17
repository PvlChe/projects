const express = require('express');
const router = express.Router();
const lessonController = require('../../controller/lesson');
const isAuth = require('../../middleware/is-auth');
const statusCheck = require('../../middleware/status-check');
const multerMW = require('../../middleware/multer-mw');



router.post('/',isAuth,statusCheck.isInstructor,multerMW.upload.single('video'), lessonController.createLesson);
router.patch('/:id',isAuth,statusCheck.isInstructor,multerMW.upload.single('video'), lessonController.updateLesson);
router.delete('/:id',isAuth,statusCheck.isInstructor, lessonController.deleteLesson);
router.get('/:id',isAuth, lessonController.getLessons);
//router.get('/:id', lessonController.getOneLesson);


module.exports = router;
