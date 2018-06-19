var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({

  username: String,
  password: String,
  fullName: String,
  email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  profileImage: String,
  Location:String,
  isAdmin:{
            type:Boolean,
            default:false
          },

  currentBranch: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch"
    },
    BranchName: String,
    Location:String
  },
  
  
  requestSubmittedOn:Date

}, {
  usePushEach: true
});



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);