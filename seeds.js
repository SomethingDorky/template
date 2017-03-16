var mongoose    = require("mongoose"),
    Thing       = require("./models/thing"),
    User       = require("./models/user"),
    Comment     = require("./models/comment");

function seedDB() {
    Comment.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Comments Removed!");   
        }
    });
    
    Thing.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Things Removed!");
            
            //for(var t = 1; t <= 8; t++) {
            //   Thing.create( {
            //        name: "Thing " + t,
            //        image_link: "https://somethingdorky.com/thing/images/dorkypics/dork" + t + ".jpg",
            //        description: "<p>Spicy jalapeno bacon ipsum dolor amet alcatra doner cow cupim. Duis ham pork dolore bresaola spare ribs biltong swine strip steak cupim mollit sint. Pork loin chuck aliqua hamburger esse pork. Adipisicing sunt commodo, esse qui aliquip mollit pork chop sausage veniam eiusmod beef ribs. Tri-tip tail ball tip, salami ut strip steak pork flank mollit anim pork loin tongue ham hock. Velit in pork chop, jerky pancetta capicola strip steak magna in adipisicing short loin chicken bacon ut.</p>"
            //    }, 
            //    function(err, thing) {
            //        if(err) {
            //            console.log(err);
            //        } else {
            //            console.log("New thing created!");
            //            Comment.create( {
            //                text: "This is a test comment.", 
            //                author: "Some Dork"
            //            }, 
            //            function(err, comment) {
            //                if(err) {
            //                    console.log(err);
            //                } else {
            //                    thing.comments.push(comment);
            //                    thing.save();
            //                    console.log("New comment added!");
            //                }
            //            });
            //        }
            //    });
            //}
        }
    });
    
    User.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Users Removed!");   
        }
    });
}

module.exports = seedDB;