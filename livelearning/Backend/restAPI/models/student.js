const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
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
        courses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]
    },
    {timestamps: true}
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;