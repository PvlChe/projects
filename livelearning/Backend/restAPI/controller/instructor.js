const Instructor = require('../models/instructor');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../constants');

/* FOR TESTING */
exports.getOneInstructor = (req, res, next) => {
    Instructor.findById(req.params.id).then((data) => {
        let result = {
            _id: data._id,
            name: data.name,
            email: data.email,
            description: data.description,
            courses: []
        };
        data.courses.forEach(elem => {
            result.courses.push({
               courseId: elem,
               url: constants.API_URL + '/api/instructors/' + elem
            });

        });
        res.status(200);
        res.locals.items = data;
        res.locals.processed = true;
        next();
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.getAllInstructor = (req, res, next) => {
    Instructor.find({}).then((data) => {
        res.status(200);
        res.locals.items = data;
        res.locals.processed = true;
        next();
    }).catch(next);
};

// exports.patchInstructor = (req, res, next) => {
//         const errors = validationResult(req);
//         // validation Error Handling
//         if (!errors.isEmpty()) {
//             const error = new Error(errors.array()[0].msg);
//             error.statusCode = 422;
//             error.data = errors.array();
//             throw error;
//         }
//         const id = req.params.id;
//         const email = req.body.email;
//         const name = req.body.name;
//         const password = req.body.password;
//         const description = req.body.description;
//         bcrypt.hash(password, 12)
//             .then(
//                 hashedPw => {
//                     const instructor ={
//                         email: email,
//                         name: name,
//                         password: hashedPw,
//                         description: description
//                     };
//                     Instructor.findOneAndUpdate({_id: id} , instructor, {new: true}).then((data) => {
//                         res.status(200);
//                         res.locals.items = data;
//                         res.locals.processed = true;
//                         next();
//                     })
//                     .catch(err => {
//                         if (!err.statusCode) {
//                             err.statusCode = 500;
//                         }
//                         next(err);
//                     });
//              }).catch(next)
// };

exports.patchInstructor = (req,res,next) => {
    let updateBody={};
    if (req.body.name) {
        updateBody.name = req.body.name;
    }
    if (req.body.description) {
        updateBody.description = req.body.description;
    }
    if (req.file) {
        updateBody.imageURL = req.file.location;
    }
    Instructor.findByIdAndUpdate(req.params.id, updateBody, {new: true}).then(data => {
        res.status(200);
        res.locals.items = data;
        res.locals.processed = true;
        next();
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.deleteInstructor = (req, res, next) => {
    Instructor.findByIdAndDelete(req.params.id).then((data) => {
        res.status(200);
        res.locals.items = data;
        res.locals.processed = true;
        next();
    }).catch(next);
};
/*--------------------------------------*/


exports.signUp = (req, res, next) => {
    const errors = validationResult(req);

    // validation Error Handling
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    //saving data

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const description = req.body.description;
    let pictureURL = undefined;
    if(req.file) {
        pictureURL = req.file.location;
    }

    bcrypt.hash(password, 12)
        .then(
            hashedPw => {
                const instructor = new Instructor({
                    email: email,
                    name: name,
                    password: hashedPw,
                    description: description,
                    imageURL: pictureURL
                });
                return instructor.save();
            }
        )
        .then(result => {
            res.status(201);
            res.locals.items = {message: 'Instructor erstellt!', userId: result._id, email: result.email};
            res.locals.processed = true;
            next();
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedInstructor;
    Instructor.findOne({email: email})
        .then(instructor => {
            if (!instructor) {
                const error = new Error('Email couldnt be found!');
                error.statusCode = 401;
                throw error;
            }
            loadedInstructor = instructor;
            return bcrypt.compare(password, instructor.password);

        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                    userId: loadedInstructor._id.toString(),
                    status: 'instructor'
                },
                constants.SECRET, // secret for JWT Token
                {expiresIn: '1h'}
            );

            const result = {
                name: loadedInstructor.name,
                email: loadedInstructor.email,
                description: loadedInstructor.description,
                courses: loadedInstructor.courses
            };
            res.status(200);
            res.locals.items = {token: token, userId: loadedInstructor._id.toString(), status: 'instructor', data: result};
            res.locals.processed = true;
            next();
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};