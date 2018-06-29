var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Request = require('../models/Request');
var Branch = require('../models/Branch');
var Member = require('../models/Member');
var flash = require('connect-flash');
var cloudinary = require('cloudinary');
var multer = require('multer'); 







router.get('/authoritySide',function(req,res){

      
      res.render('authoritySide');


  })
 

router.get('/authorityRegistration',function(req,res){

      
      res.render('registerAuthority');


  })

router.get("/branch/:id",function(req, res){
  Branch.findById(req.params.id,function(err,branch){
    if(err){
    console.log(err)
} else{
   Branch.find({},function(err,branches) {
     if(err){
      console.log(err)
    }else{
      res.render("particularBranchOfficer",{branches:branches,branch:branch});
   }
 })
 }
  })
})






router.post('/registerAuthority',function(req,res){
    
    var enteredPhoneNumber = req.body.username;
    var registeredPhoneNumbers = ["9876543210","1234567890","8097448698","9988776655"]

    
      
     if (registeredPhoneNumbers.some(x => x === enteredPhoneNumber)) {
          
              var newUser = new User({
    username: req.body.username,
    fullName: req.body.fullName,
       email: req.body.email,
    Location: req.body.Location,
     isAdmin: true
  })

         User.register(newUser,req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/authoritySide")
      })
    }

     })


  }
})






router.get("/viewRequest/:id",function(req,res){
  Request.findById(req.params.id,function(err,request){
    if (err) {
      consolej.log(err)
    } else {
      res.render("viewRequest",{request:request})
    }
  })
})



router.post('/authorize', passport.authenticate("local", {
  successRedirect: "/regionwiseRequests",
  failureRedirect: "/"
}), function(req, res) {

});


router.get('/regionwiseRequests',function(req,res){
 var noMatch = null;
  if(req.query.search){
     const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    User.findById(req.user._id,function(err,user){
  if (err) {
    console.log(err)
  } else {
     Request.find({"requestedBranch.BranchName":regex}).sort({preference:1}).exec(function(err,requests){
    if (err) {
      console.log(err);
    } else {
       
        Branch.find({}).exec(function(err,branches){
        if (err) {
           console.log(err);
        } else {
        if(requests.length < 1){
                noMatch = "no result found please check the spell";
        }
         res.render("regionwiseRequests",{requests:requests,branches:branches,noMatch:noMatch})
        }
      })
      
      }
  })
  }
})
  }else{
User.findById(req.user._id,function(err,user){
  if (err) {
    console.log(err)
  } else {
     Request.find({}).sort({preference:1}).exec(function(err,requests){
    if (err) {
      console.log(err);
    } else {
        Branch.find({}).exec(function(err,branches){
        if (err) {
           console.log(err);
        } else {
          
         res.render("regionwiseRequests",{requests:requests,branches:branches,noMatch:noMatch})
        }
      })
      
       }
  })
  }
})
}
  
})


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



router.post("/acceptRequest/:id",isLoggedIn,function(req,res){

  Request.findById(req.params.id,function(err,request){
      if (err) {
        console.log(err)
      } else {

      User.findById(request.id,function(err,user) {
           if (err) {
            console.log(err)
           } else {
            Branch.findById(request.requestedBranch.id,function(err,requestedBranch){
              if (err) {
                console.log(err)
              } else {
                Branch.findById(user.currentBranch.id,function(err,currentBranch){
                  if (err) {
                    console.log(err)
                  } else {

                Branch.update({_id:currentBranch._id},{$pull:{Members:{id:user._id}}},function(err,removedMember){
                  if (err) {
                    console.log(err)
                  } else {
                    

                    var memberToTransfer = {
                      id:user._id,
                      username:user.username,
                      fullName:user.fullName,
                      email:user.email,
                      post:user.post,
                      profileImage:user.profileImage
                    }


                    requestedBranch.Members.push(memberToTransfer);
                    requestedBranch.save()

                    request.requestedBranch.Accepted = true;
                    request.save()

                    user.currentBranch.id = requestedBranch._id;
                    user.currentBranch.BranchName = requestedBranch.BranchName;
                    user.currentBranch.Location = requestedBranch.Location;
                    user.requestStatus.requestAccepted = true;
                    user.requestStatus.requestAcceptedOn = new Date()
                    user.requestStatus.requestAcceptedId = request._id;
                    user.requestStatus.requestAcceptedBranchName = requestedBranch.BranchName
                    user.save()

                    res.redirect("back")
                  }
                })


                  }
                })
              }
            })
           }
      })


      }
    })
})












////////////////// #### Middleware ##### for checking if user is logged in or not//////////////////////////////////////
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error","You must be logged in to do that");
    res.redirect('/login');
  }
}

// function isAdmin(req,res,next){
//   if (req.user.username === "Admin") {
//     return next();
//   } else {
//     req.flash("error","You must be logged in to do that");
//     res.render('login');
//   }
// }






 module.exports = router; 