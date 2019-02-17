const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        password: {
            type: String,
            required: [true, 'password is required']

        },
        email: {
            type: String,
            required: [true, 'E-Mail is required']
        },
        description: {
            type: String,
            required: [true, 'Description is requred']
        },
        courses: [
            {

                type: Schema.Types.ObjectId,
                ref: 'Course',
                required: [true, 'courseId required!']

            }
        ],
        imageURL: {
            type: String,
            required: [false]
        },
    },
    {timestamps: true}
);

const Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;