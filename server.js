
var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require("cors");
var router = express.Router();
var session = require('express-session');
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
const { ObjectId } = require("mongodb");

require('dotenv').config();
var app = express();


//app.set('view engine', 'ejs');
app.use(cors({
    origin: "http://localhost:3000", // restrict calls to those this address
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



console.log(process.env.SECRET + " Got from the environment file ");

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());


//Connecting to MongoDB using mongoose
try {
// mongoose.connect('mongodb+srv://Krushmi:Krushmi123@cluster0.wq4butl.mongodb.net/Krushmi?retryWrites=true&w=majority', {useNewUrlParser: true,eUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/ksmovies', { useNewUrlParser: true, eUnifiedTopology: true })
mongoose.set("useCreateIndex", true);

console.log("connected");
} catch (error) {
    
    console.log("Error occure while connection");
}


//Defining Schemas
var userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    contactNumber: String,
    password: String,
    admin: String
});

var bookingSchema = new mongoose.Schema({
    booking: String
});

const showtimeSchema = new mongoose.Schema({
    "imdbID": String,
    "date": String,
    "time": String,

});

const movieSchema = new mongoose.Schema({
    "Title" : String,
    "Year" :  String,
    "Rated" :  String,
    "Released" :  String,
    "Runtime" :  String,
    "Genre" :  String,
    "Director" :  String,
    "Writer":   String,
    "Actors" :  String,
    "Plot" :  String,
    "Language" :  String,
    "Country" :  String,
    "Awards" :  String,
    "Poster" :  String,
    "Ratings" : Object,
    "Metascore" :  String,
    "imdbRating" :  String,
    "imdbVotes" : String,
    "imdbID" : String,
    "Type" :  String,
    "DVD" : String,
    "BoxOffice" :  String,
    "Production" :  String,
    "Website" :  String,
    "Response" : String
});


//Using passport-local-mongoose plugin on userSchema
userSchema.plugin(passportLocalMongoose);

//Defining Models
var User = new mongoose.model('User', userSchema);
var Booking = new mongoose.model('Booking', bookingSchema);
const Movie = new mongoose.model('Movie', movieSchema);
const Showtime = new mongoose.model('Showtime', showtimeSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//All our requests go in here
router.get('/signedin', function(req, res){
    res.json(req.isAuthenticated());
    // console.log(req.session.admin)
});

router.get('/getlevel', function(req, res){
    res.json(req.session.admin);
});

router.post('/signin', function(req, res){

    

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    const originalreq = req;
    const originalres = res;

    req.login(user, function(err){
        if (err) {
            console.log(err);
        }
        else {
            passport.authenticate("local")(req, res, function(){
                
                // console.log("SIGININ", req.user)
                const u = req.user;
                originalreq.session.admin = u.admin;
                res.send(u);
                
            });
        }
    });
});

router.post('/register', function(req, res){

   // console.log(req);
    User.register({fullName: req.body.fullName, admin:false,
        username: req.body.username,
        contactNumber: req.body.contactNumber}, req.body.password, function(err, user){
            passport.authenticate("local")(req, res, function(){
                res.json(user);
        });
    });
});

router.post('/pay', function(req, res){
    var newBooking = Booking({booking: req.body.bookingDetails}).save(function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    });
});

router.post('/seats', function(req, res){
 
    var regex1 = '^' + req.body.bookingDetails;
    var regex2 = regex1.replace(/\//g, "\\/");
    var re = new RegExp(regex2,"g");

    Booking.find({booking: re}, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    });

    
});

router.get('/movies', (req, res) => {
    Movie.find({}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})


router.post('/getmoviedetails', (req, res) => {
    Movie.find({ _id: req.body.movieId }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})

router.post('/deletemovie', (req, res) => {
    Movie.deleteOne({ _id: ObjectId(req.body.movieId) }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})


router.post('/setmoviedetails', (req, res) => {
    const obj = req.body;
    let id = null;
    if (obj._id) {
        id = obj._id; 
    } else {
        id = mongoose.Types.ObjectId();
    }
 
    delete obj._id;
    Movie.update({ _id: id }, obj, { upsert: true, setDefaultsOnInsert: true }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})


router.get('/allshowtimes', (req, res) => {
    Showtime.find({}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})

router.post('/getshowtimesformovie', (req, res) => {
    Showtime.find({ imdbID: req.body.imdbID }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})


router.post('/deleteshowtime', (req, res) => {
    Showtime.deleteOne({ _id: ObjectId(req.body.timeId) }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})



router.post('/updateshowtimes', (req, res) => {
    const obj = req.body;
    let id = null;
    if (obj._id) {
        id = obj._id; 
    } else {
        id = mongoose.Types.ObjectId();
    }
 
    delete obj._id;
    Showtime.update({ _id: id }, obj, { upsert: true, setDefaultsOnInsert: true }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})


router.get('/bookings', (req, res) => {
    Booking.find({}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})


router.get('/logout', function(req, res){
    req.session.admin = false;
    req.logout();
    res.json(req.isAuthenticated());
});

app.use('/api', router);

app.listen(3001);
console.log("Listening to port 3001\n");
