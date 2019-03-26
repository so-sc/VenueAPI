const express = require('express');
const bodyParser = require('body-parser');

require('./config/database');

const app = express();

// Routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//API ENDPOINTS
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

//Run Server
app.listen(port, () => {
    console.log('Server Running on Port : ' + port);
});