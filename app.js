// Set all variables
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Thing           = require("./models/thing"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
    
var commentRoutes   = require("./routes/comments"),
    thingRoutes     = require("./routes/things"),
    indexRoutes     = require("./routes/index");

// Connect Mongoose to MongoDB    
var url = process.env.DATABASEURL || "mongodb://localhost/template";
mongoose.connect(url);

// App Configuration Options
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Seed the DB with sample data
// seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "I like watching Lincoln run!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
   
// Require Routes
app.use("/", indexRoutes);
app.use("/things", thingRoutes);
app.use("/things/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Thing Server Started");
});