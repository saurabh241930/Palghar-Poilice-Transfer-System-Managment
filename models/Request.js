var mongoose = require('mongoose');


var RequestSchema = new mongoose.Schema({


    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    fullName: String,
    Location:String,
    branch: String,
    email: String,
    post:String,
    profileImage: String,
    preference:Number,
    type:String,
    specialRequest:{
        type: Boolean,
        default: false
      },
    description:String,
    requestedBranch: {
      Location:String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
      },
      BranchName: String,
      RequestedCreatedOn: {
        type: Date,
        default: Date.now
      },
      Accepted: {
        type: Boolean,
        default: false
      }

    }



  


}, {
  usePushEach: true
});



module.exports = mongoose.model("Request", RequestSchema);