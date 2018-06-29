var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({

  username: String,
  password: String,
  fullName: String,
  post:String,
  nextApplicableDate:{type:Date,default:Date.now},

  email: {type: String, unique: true, required: true},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  requestInProcess:{type:Boolean,default:false},

  profileImage:{type:String,default:"https://i.imgur.com/JijLK0p.png"},

  Location:String,

 

  requestStatus:{
    requestAccepted:{type:Boolean,default:false},
    requestAcceptedOn:Date,
    requestAcceptedId:{type: mongoose.Schema.Types.ObjectId,ref: "Branch"},
    requestAcceptedBranchName:String
  },

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