const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require('cookie-parser')

require("dotenv/config");
require("./config/passport")(passport);

const todoRoute = require("./routes/todo");
const userRoute = require("./routes/user");

const port = process.env.PORT || 3000;
const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser('foo'));
app.use(session({
    secret : 'foo',
    cookie : {
        expires: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

app.use('/todo', todoRoute);
app.use('/user', userRoute)

app.get('/', (req,res)=>{
    res.send("Working");
});
app.get('/error', (req,res)=>{
    res.send("error");
});

mongoose.connect(
    process.env.DB_Connection,
    { useUnifiedTopology: true, useNewUrlParser: true },
    ()=> console.log("connected")
);

app.listen(port, ()=> console.log("running in port:",port));