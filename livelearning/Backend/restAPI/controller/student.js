const Student = require('../models/student');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../constants');

/*FOR TESTING*/
exports.getOneStudent =  (req, res, next) => {
    Student.findById(req.params.id).then((data) =>{
        let result = {
            _id: data._id,
            name: data.name,
            email: data.email,
            courses: []
        };
        data.courses.forEach(elem => {
            result.courses.push({
                courseId: elem,
                url: constants.API_URL + '/api/students/' + elem
            });

        });
        res.status(200);
        res.locals.items = result;
        res.locals.processed = true;
        next();
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.getAllStudent = (req,res,next) => {
    Student.find({}).then((data) =>{
        res.status(200);
        res.locals.items = data;
        res.locals.processed = true;
        next();

    }).catch(next);
};

// exports.patchStudent = (req, res, next) => {
//     const errors = validationResult(req);
//     // validation Error Handling
//     if (!errors.isEmpty()) {
//         const error = new Error(errors.array()[0].msg);
//         error.statusCode = 422;
//         error.data = errors.array();
//         throw error;
//     }
//     const id = req.params.id;
//     const email = req.body.email;
//     const name = req.body.name;
//     const password = req.body.password;
//     bcrypt.hash(password, 12)
//         .then(
//             hashedPw => {
//                 const student ={
//                     email: email,
//                     name: name,
//                     password: hashedPw
//                 };
//                 Student.findOneAndUpdate({_id: id} , student, {new: true}).then((data) => {
//                     res.status(200);
//                     res.locals.items = data;
//                     res.locals.processed = true;
//                     next();
//                 })
//                     .catch(err => {
//                         if (!err.statusCode) {
//                             err.statusCode = 500;
//                         }
//                         next(err);
//                     });
//             }).catch(next)
// };

exports.patchStudent = (req,res,next) => {
    Student.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(data => {
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

exports.deleteStudent = (req, res, next) => {
    Student.findByIdAndDelete(req.params.id).then((data) => {
        res.send(data);
    }).catch(next);
};



/*______________________________*/




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
    bcrypt.hash(password, 12)
        .then(
            hashedPw => {
                const student = new Student({
                    email: email,
                    name: name,
                    password: hashedPw
                    //TODO Profile Picture, when Cloud storage is available
                });
                return student.save();
            }
        )
        .then(result => {

            res.status(201);
            res.locals.items = {message: 'Student erstellt!', userId: result._id};
            res.locals.processed = true;
            next();

            //res.status(201).json();
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedStudent;
    Student.findOne({email: email})
        .then(student => {
            if (!student) {
                const error = new Error('Email couldnt be found!');
                error.statusCode = 401;
                throw error;
            }
            loadedStudent = student;
            return bcrypt.compare(password, student.password);

        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                    userId: loadedStudent._id.toString(),
                    status: 'student'
                },
                constants.SECRET, // secret for JWT Token
                {expiresIn: '1h'}
            );
            res.status(200);
            res.locals.items = {token: token, userId: loadedStudent._id.toString(), status: 'student', data: loadedStudent};
            res.locals.processed = true;
            next();
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
};