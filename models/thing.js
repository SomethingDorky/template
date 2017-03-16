var mongoose = require("mongoose");

var thingSchema = new mongoose.Schema({
   name: String,
   image_link: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
         }
      ]
});

module.exports = mongoose.model("Thing", thingSchema);