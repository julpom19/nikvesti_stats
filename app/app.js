const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors')

const router = require('../helpers/router');

// const regionsRouter = require('./routes/v1/regions');
// const departmentsRouter = require('./routes/v1/departments');
// const operatorsRouter = require('./routes/v1/operators');
// const chatsRouter = require('./routes/v1/chatLogs');
// const loginRouter = require('./routes/v1/auth/login');
// const signupRouter =  require('./routes/v1/auth/signup');
console.log('in app')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


app.use('/', router);
// app.use('/v1/regions', regionsRouter);
// app.use('/v1/departments', departmentsRouter);
// app.use('/v1/operators', operatorsRouter);
// app.use('/v1/chats', chatsRouter);
// app.use('/v1/login', loginRouter);
// app.use('/v1/signup', signupRouter);

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;