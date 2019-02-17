const express = require('express');
const router = express.Router();
const studentController = require('../../controller/student');
const isAuth = require('../../middleware/is-auth');
const statusCheck = require('../../middleware/status-check');

router.get('/:id',isAuth,statusCheck.isStudent, studentController.getOneStudent);
router.patch('/:id', isAuth,statusCheck.isStudent,studentController.patchStudent);


module.exports = router;