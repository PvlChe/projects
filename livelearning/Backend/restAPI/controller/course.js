const Course = require('../models/course');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const constants = require('../constants');
const mongoose = require('mongoose');

exports.getCourses = (req, res, next) => {
    Course.find({}).then(data => {
        //res.status(200).json(data);
        if (!data) {
            const error = new Error('Course couldnt be found!');
            error.statusCode = 401;
            throw error;
        }
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

exports.searchCourses = (req, res, next) => {
    const searchString = req.params.id;
    Course.find({$or: [{'name' : new RegExp(searchString, 'i')},{'category' : new RegExp(searchString, 'i')}]})
        .then(data => {
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

exports.getCourse = (req, res, next) => {
    const courseId = req.params.id;
    Course.findById(courseId).then(data => {
        //res.status(200).json(data);
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

exports.patchCourse = (req, res, next) => {
    Course.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(data => {
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


exports.getInstructorCourses = (req, res, next) => {
    const instructorId = req.params.id;
    Course.find({instructor: instructorId}).then(data => {
        //res.status(200).json(data);
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

exports.getStudentCourses = (req, res, next) => {
    const studentId = req.params.id;
    let studentCourses = [];
    Student.findById(studentId)
        .then(student => {
            Course.find({_id: {$in: student.courses}}).then((courses) => {
                res.status(200);
                res.locals.items = courses;
                res.locals.processed = true;
                next();
            });
        })
        //res.status(200).json(studentCourses);
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.createCourse = (req, res, next) => {
    const instructorId = req.body.instructor;
    let loadedInstructor;
    if (!req.file) {
        const error = new Error('Course needs to have a Imagefile!');
        error.statusCode = 422;
        throw error;
    }
    Instructor.findById(instructorId)
        .then(instructor => {
            if (!instructor) {
                const error = new Error('Instructor couldnt be found!');
                error.statusCode = 401;
                throw error;
            }
            loadedInstructor = instructor;
            const course = new Course({
                name: req.body.name,
                instructor: req.body.instructor,
                description: req.body.description,
                category: req.body.category,
                imageURL: req.file.location
            });
            return course.save();
        })
        .then(result => {
            loadedInstructor.courses.push(result);
            loadedInstructor.save();
            //res.status(201).json({message: 'Course created!', courseId: result})
            res.status(201);
            res.locals.items = {message: 'Course created!', courseId: result};
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

exports.takeCourse = (req, res, next) => {
    const studentId = req.body.studentId;
    let loadedStudent;
    let loadedCourse;

    Course.findById(req.params.id).then(course => {
        if (!course) {
            const error = new Error('Course couldnt be found!');
            error.statusCode = 401;
            throw error;
        }
        loadedCourse = course;
        return Student.findById(studentId);
    })
        .then((student) => {
            if (!student) {
                const error = new Error('Student couldnt be found!');
                error.statusCode = 401;
                throw error;
            }

            loadedStudent = student;
            if (loadedStudent.courses.indexOf(loadedCourse._id) >= 0) {
                const error = new Error('Course is already by student');
                error.statusCode = 401;
                throw error;
            }
            if (loadedCourse.students.indexOf(loadedStudent._id) >= 0) {
                const error = new Error('Student is already in course');
                error.statusCode = 401;
                throw error;
            }
            loadedStudent.courses.push(loadedCourse);
            loadedCourse.students.push(student);
            loadedCourse.save();
            loadedStudent.save();

            res.status(201);
            res.locals.items = {message: "Student is in course!"};
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

exports.checkCourseStatus = (req, res, next) => {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const status = req.body.status;
    if (status === 'student') {
        Course.findById(req.params.id).then(course => {
            if (course.students.indexOf(userId) >= 0) {
                res.locals.items = {courseStatus: 'student-owner'};
                res.status(200);
                res.locals.processed = true;
                next();
            } else {
                res.locals.items = {courseStatus: 'student-non-owner'};
                res.status(200);
                res.locals.processed = true;
                next();
            }
        })
    } else if (status === 'instructor') {
        Course.findById(req.params.id).then(course => {
            if (course.instructor.equals(userId)) {
                res.locals.items = {courseStatus: 'instructor-owner'};
                res.status(200);
                res.locals.processed = true;
                next();
            } else {
                res.locals.items = {courseStatus: 'instructor-non-owner'};
                res.status(200);
                res.locals.processed = true;
                next();
            }
        })
    } else {
        res.locals.items = {courseStatus: 'unregistered'};
        res.status(200);
        res.locals.processed = true;
        next();
    }
};

