const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
        title: {
            type: String,
            required: [true, 'title required!']
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'courseId required!']
        },
        videoURL: {
            type: String,
            required: [true, 'Videofile required!']
        },
    },
    {timestamps: true}
);


module.exports = mongoose.model('Lesson', LessonSchema);