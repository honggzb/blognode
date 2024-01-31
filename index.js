const express = require('express')
const path = require('path')
const bodyParse = require('body-parser')
const cookieParse = require('cookie-parser')
const csrf = require('csurf')

const db = require('./db/mongodb');
const isAuth = require('./middleware/isAuth');

require('dotenv').config();

const app = express()
const csrfProtection = csrf({cookie: true});
db();

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

app.set('view engine', 'ejs');
app.use(cookieParse());
app.use(bodyParse.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrfProtection);
app.use(isAuth.authenticateToken, (req, res, next) => {
    res.locals.isAuth = req.user;
    res.locals.csrfToken = req.csrfToken;
    next();
})
app.use(userRouter);
app.use(postRouter);

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})