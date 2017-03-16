var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing"); 
});

// AUTH ROUTES

// SHOW REGISTER -- Show the registration form
router.get("/register", function(req, res) {
   res.render("register"); 
});

// REGISTER -- Register the new user in the database
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome! " + user.username);
            res.redirect("/things");
        });
    });
});

// SHOW LOGIN - Display the login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

// LOGIN - Log the user in
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/things", 
        failureRedirect: "/login"
    }), function(req, res) {
});

// LOGOUT - Log the user out
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/things");
});

module.exports = router;