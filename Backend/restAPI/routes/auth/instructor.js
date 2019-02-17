const express = require('express');
const router = express.Router();
const instructorController = require('../../controller/instructor');
const isAuth = require('../../middleware/is-auth');
const statusCheck = require('../../middleware/status-check');
const multerMW = require('../../middleware/multer-mw');


router.get('/:id',isAuth,statusCheck.isInstructor,instructorController.getOneInstructor);
router.patch('/:id', isAuth, statusCheck.isInstructor,multerMW.upload.single('image'),instructorController.patchInstructor);


module.exports = router;