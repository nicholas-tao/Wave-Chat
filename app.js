const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const app = express()
require('./config/passport')(passport)


// connecting to db
const db = require('./config/keys').MongoURI
mongoose.connect(db, {useNewUrlParser: true})
    .then(()=>console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// allows us to use ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

// allows us to parse data with req.body. ...
app.use(express.urlencoded({extended: false}))







app.use(express.static("dashboard-styling"))






//////////////////////////////////////////////////////////
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())  
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.contentCode = req.flash('contentCode')
    next()
})
//////////////////////////////////////////////////////////


//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server started on port ${PORT}`))