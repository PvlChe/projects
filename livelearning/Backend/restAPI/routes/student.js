const express = require('express');
const router = express.Router();
const studentController = require('../controller/student');
const studentModel = require('../models/student');
const {body} = require('express-validator/check');

/* Testing Purposes */
router.get('/', studentController.getAllStudent);
router.patch('/:id', studentController.patchStudent);
router.delete('/:id', studentController.deleteStudent);
/*----*/


router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Bitte Email eingeben!')
        .custom((value) => {
            return studentModel.findOne({email: value}).then(studentDuplicate => {
                if (studentDuplicate) {
                    throw 'Email gibs schon';
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
], studentController.signUp);

router.post('/login', studentController.login);

module.exports = router;