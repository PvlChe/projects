const Lesson = require('../models/lesson');
const Course = require('../models/course');
const constants = require('../constants');

exports.getLessons = (req, res, next) => {
    Lesson.find({course: req.params.id}).then(data => {
        res.status(200);
        res.locals.items = data;
        res.locals.processed = true;
        next();

        //res.status(200).json(data);
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};


exports.getOneLesson = (req, res, next) => {
    Lesson.findById(req.params.id).then(data => {
        const result = {
            _id: data._id,
            title: data.title,
            course: {
                courseId: data.course.courseId,
                url: constants.API_URL + '/api/auth/courses/' + data.course.courseId
            }
        };
        res.status(200);
        res.locals.items = result;
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

exports.deleteLesson = (req, res, next) => {
    Lesson.findByIdAndRemove(req.params.id).then(data => {
        Course.update({_id: data.course}, {$pull: {lessons: {_id: req.params.id}}}).then(() => {
            res.status(200);
            res.locals.items = {msg: "Lesson deleted"};
            res.locals.processed = true;
            next();
        });
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateLesson = (req, res, next) => {
    let updateBody = {};
    if (req.body.title) {
        updateBody.title = req.body.title;
    }
    if (req.file) {
        updateBody.videoURL = req.file.location;
    }
    Lesson.findByIdAndUpdate(req.params.id, updateBody, {new: true}).then((data) => {
        res.status(200);
        res.locals.items = {data};
        res.locals.processed = true;
        next();
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.createLesson = (req, res, next) => {
    const courseId = req.body.course;
    let loadedCourse;
    if (!req.file) {
        const error = new Error('Lesson needs to have a Videofile!');
        error.statusCode = 422;
        throw error;
    }
    Course.findById(courseId)
        .then(course => {
            if (!course) {
                const error = new Error('Course couldnt be found!');
                error.statusCode = 401;
                throw error;
            }
            loadedCourse = course;
            const lesson = new Lesson({
                title: req.body.title,
                course: req.body.course,
                videoURL: req.file.location
            });
            return lesson.save();
        })
        .then(result => {
            loadedCourse.lessons.push(result._id);
            loadedCourse.save();
            res.status(201);
            res.locals.items = {message: 'Lesson created!', lessonId: result._id.toString()};
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
