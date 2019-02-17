const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const filter = require('./middleware/filter');


const app = express();

//connect to mongoDB

const mongoDBURI=
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-1tq1j.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;


mongoose.Promise = global.Promise;

// bodyparser
app.use(bodyParser.json());

// CORS Header Handling
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// routes
app.use('/api/instructors', require('./routes/instructor'));
app.use('/api/students', require('./routes/student'));
app.use('/api/courses/', require('./routes/course'));
app.use('/api/lessons/', require('./routes/lesson'));

app.use('/api/auth/courses', require('./routes/auth/course'));
app.use('/api/auth/lessons', require('./routes/auth/lesson'));
app.use('/api/auth/instructors', require('./routes/auth/instructor'));
app.use('/api/auth/students', require('./routes/auth/student'));

//filterware
app.use(filter);

// response handling
app.use((req,res,next)=> {
    res.json(res.locals.items);
    delete res.locals.items;
});


// error handling
app.use((err,req,res,next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({
        message: message,
        data: data
    })
});


// test


mongoose.connect(mongoDBURI, {useNewUrlParser: true}).then(()=> {
    app.listen(process.env.PORT || 4000, function () {
        console.log('listening');
    });
}).catch((err)=> {
});
