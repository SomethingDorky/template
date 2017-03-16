var express = require("express");
var router  = express.Router();
var Thing   = require("../models/thing");
var middleware = require("../middleware");

// INDEX - Show all Things
router.get("/", function(req, res) {
    Thing.find({}, function(err, things) {
        if(err) {
            console.log("OH NOES!");
            console.log(err);
        } else {
            res.render("things/index", {things: things});
        }
    });
});

// CREATE - Add a new thing to the database
router.post("/",  middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image_link = req.body.image_link;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newThing = {name: name, image_link: image_link, description: description, author: author};
    
    Thing.create(newThing, function(err, thing) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/things");
        }
    });
});

// NEW - Show form to create a new thing
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("things/new"); 
});

// SHOW - Show details about one thing
router.get("/:id", function(req, res) {
    Thing.findById(req.params.id).populate("comments").exec(function(err, thing) {
        if(err) {
            console.log(err);    
        } else {
            res.render("things/show", {thing: thing});
        }
    });
});

// EDIT 
router.get("/:id/edit", middleware.checkThingOwnership, function(req, res) {
        Thing.findById(req.params.id, function(err, thing) {
            if(err) {
                res.redirect("back");
            } else {
                res.render("things/edit", {thing: thing});
            }
        });
});

// UPDATE
router.put("/:id", middleware.checkThingOwnership, function(req, res) {
    Thing.findByIdAndUpdate(req.params.id, req.body.thing, function(err, thing) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/things/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:id", middleware.checkThingOwnership, function(req, res) {
    Thing.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/things");
        }
    });
});

module.exports = router;