const express = require('express');
const router = express.Router();
const instructorController = require('../controller/instructor');
const instructorModel = require('../models/instructor');
const {body} = require('express-validator/check');
const multerMW = require('../middleware/multer-mw');

/* Testing Purposes */
router.get('/', instructorController.getAllInstructor);
router.get('/:id', instructorController.getOneInstructor);
router.patch('/:id', instructorController.patchInstructor);
router.delete('/:id', instructorController.deleteInstructor);
/* ----*/

router.post('/signup', multerMW.upload.single('image'), [
    body('email')
        .isEmail()
        .withMessage('Bitte Email eingeben!')
        .custom((value) => {
            return instructorModel.findOne({email: value}).then(instructorDuplicate => {
                if (instructorDuplicate) {
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
],instructorController.signUp);

router.post('/login', instructorController.login);

module.exports = router;