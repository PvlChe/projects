const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'Instructor',
            required: [true, 'Instructor ID required']
        },
        description: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: [true, 'Category is required']
        },
        imageURL: {
            type: String,
            required: [true, 'Imagesource required!']
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            }
        ],
        lessons: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lesson'
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model('Course', courseSchema);