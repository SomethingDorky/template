var Thing = require("../models/thing");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkThingOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Thing.findById(req.params.id, function(err, thing) {
            if(err) {
                req.flash("error", "There was an error retrieving that Thing.");
                res.redirect("back");
            } else {
                if(thing.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if(err) {
                req.flash("error", "There was an error retrieving that comment.");
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};

module.exports = middlewareObj;