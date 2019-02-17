exports.isInstructor = (req,res,next) => {
    if(req.status !== 'instructor') {
        const error = new Error('Authentication Error!');
        error.statusCode = 401;
        throw error;
    }
    next();
};

exports.isStudent = (req,res,next) => {
    if(req.status !== 'student') {
        const error = new Error('Authentication Error!');
        error.statusCode = 401;
        throw error;
    }
    next();
};