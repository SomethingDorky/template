var express = require("express");
var router  = express.Router({mergeParams: true});
var Thing  = require("../models/thing");
var Comment   = require("../models/comment");
var middleware = require("../middleware");

// NEW -- Show the new comment form
router.get("/new", middleware.isLoggedIn, function(req, res) {
   Thing.findById(req.params.id, function(err, thing) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {thing: thing});
        }
   });
});

// CREATE -- Add a comment to the database
router.post("/", middleware.isLoggedIn, function(req, res) {
    Thing.findById(req.params.id, function(err, thing) {
        if(err) {
            console.log(err);
            res.redirect("/things");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   console.log(err);
               } else {
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   
                   thing.comments.push(comment);
                   thing.save();
                   
                   res.redirect("/things/" + thing._id);
               }
            });
        }
    });
});

// SHOW EDIT -- Show Edit Form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
       if(err) {
            res.redirect("back");
       } else {
            res.render("comments/edit", {thing_id: req.params.id, comment: comment});
       }
    });
    
});

// UPDATE -- Update comment in database.
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/things/" + req.params.id);
        }
        
    });    
});

// DESTROY -- Delete a comment.
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
            res.redirect("back");
        } else {
            res.redirect("/things/" + req.params.id);
        }
   });
});

module.exports = router;