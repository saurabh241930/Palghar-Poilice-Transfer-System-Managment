var express = require('express');
var router = express.Router();
var passport = require('passport');
var methodOverride = require('method-override');
var multer = require('multer');     
var path = require('path');
var fs = require('fs');

var upload = multer({ dest: 'uploads/' });
var util = require('util');
var cloudinary = require('cloudinary');

var Branch = require('../models/Branch');
var User = require('../models/User');
var Request = require('../models/Request');


 var async = require("async");
 var nodemailer = require("nodemailer");
 var crypto = require("crypto");



 var upload = multer({ dest: './uploads/'});

router.get("/branchMap",function(req,res){
  res.render("branchMap")
})


router.get("/imageUpload",function(req,res){
  res.render("addImage")
})

 router.post('/imageUpload', upload.single('file'), function(req,res){
   
 
    cloudinary.uploader.upload(req.file.path,
    function(result){
      
      User.findById(req.user._id,function(err,user){
        if (err) {
          console.log(err)
        } else {
          user.profileImage = result.secure_url;
          user.save()
          res.redirect("/homepage")
        }
      })
      
    })
 })






router.get('/',function(req,res){
      res.render('infoPage');
        
})

router.get('/status',function(req,res){
  Request.find({'id':req.user._id}).sort({preference:1}).exec(function(err,requests){
    if (err) {
      console.log(err);
    } else {
      
      res.render('status',{requests:requests});
        }
  })
      
      
       
})

router.get('/homepage',function(req,res){
      Branch.find({},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('homepage',{branches:branches});
        }
  })
})

router.get('/apply',function(req,res){
      Branch.find({},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('applyForm',{branches:branches});
        }
  })
})


router.post('/apply/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {

       user.requestInProcess = true;
       user.requestSubmittedOn = new Date();
       d = user.requestSubmittedOn;
       var year = d.getFullYear();
       var month = d.getMonth();
       var day = d.getDate()
  
       user.nextApplicableDate = new Date(year + 1, month, day)

       user.save()


      Branch.findById(req.body.preference1, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 1,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

            

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference2, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 2,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

             

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference3, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 3,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

      

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference4, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 4,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {


              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference5, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 5,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

        

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference6, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 6,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {


              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference7, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: user.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 7,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

           

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference8, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 8,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

         

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference9, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 9,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

             

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference10, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 10,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

             

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

    res.redirect("/status")


    }
  })
})


/////////////////////////////////special request///////////////////////////////////////





router.get('/specialApply',function(req,res){
      Branch.find({},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('specialApply',{branches:branches});
        }
  })
})


router.post('/specialApply/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {

       // user.requestInProcess = true;
       // user.requestSubmittedOn = new Date();
       // d = user.requestSubmittedOn;
       // var year = d.getFullYear();
       // var month = d.getMonth();
       // var day = d.getDate()
  
       // user.nextApplicableDate = new Date(year + 1, month, day)

       // user.save()

      


        Branch.findById(req.body.specialRequest, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

        var specialApply = {specialRequest:req.body.specialRequest,description:req.body.description} 



          Request.create(specialApply, function(err, specialApply) {
            if (err) {
              console.log(err)
            } else {

            

              var requestInBranch = {
                id: specialApply._id,
                By:specialApply.fullName,
                specialRequest:true
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })







      Branch.findById(req.body.preference1, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 1,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

            

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference2, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 2,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

             

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference3, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 3,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

      

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference4, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 4,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {


              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference5, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 5,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

        

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference6, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 6,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {


              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference7, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: user.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 7,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

           

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference8, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 8,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

         

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference9, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 9,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

             

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

      Branch.findById(req.body.preference10, function(err, branch) {
        if (err) {
          console.log(err)
        } else {

          var newRequest = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            Location: branch.Location,
            email: user.email,
            post:user.post,
            profileImage: user.profileImage,
            preference: 10,
            requestedBranch: {
              Location: branch.Location,
              id: branch._id,
              BranchName: branch.BranchName
            }
          }


          Request.create(newRequest, function(err, newestRequest) {
            if (err) {
              console.log(err)
            } else {

             

              var requestInBranch = {
                id: newestRequest._id,
                By:newRequest.fullName,
                preference: newestRequest.preference
              }

              branch.Requests.push(requestInBranch);
              branch.save()
              

            }
          })


        }
      })

    res.redirect("/homepage")


    }
  })
})





















router.get('/branches/Vasai',function(req,res){
      Branch.find({'Location':'Vasai'},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('branchesPage',{branches:branches,location:"Vasai"});
        }
  })
})

router.get('/branches/Nalasopara',function(req,res){
      Branch.find({'Location':'Nalasopara'},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('branchesPage',{branches:branches,location:"Nalasopara"});
        }
  })
})

router.get('/branches/Virar',function(req,res){
      Branch.find({'Location':'Virar'},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('branchesPage',{branches:branches,location:"Virar"});
        }
  })
})

router.get('/branches/Boisar',function(req,res){
      Branch.find({'Location':'Boisar'},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('branchesPage',{branches:branches,location:"Boisar"});
        }
  })
})

router.get('/branches/Dahanu',function(req,res){
      Branch.find({'Location':'Dahanu'},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('branchesPage',{branches:branches,location:"Dahanu"});
        }
  })
})

router.get('/branches/Jawahar',function(req,res){
      Branch.find({'Location':'Jawahar'},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('branchesPage',{branches:branches,location:"Jawahar"});
        }
  })
})

router.get('/branches/Palghar',function(req,res){
      Branch.find({'Location':'Palghar'},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('branchesPage',{branches:branches,location:"Palghar"});
        }
  })
})








//////////////////////////////////////////AUTH ROUTES////////////////////////////////////////
//register
router.get('/register',function(req,res){
  Branch.find({},function(err,branches){
if (err) {
  console.log(err);
} else {
  
  res.render('register',{branches:branches});
    }
})
})


router.post("/registerationChecking",function(req,res){
  User.find({},function(err,users){
    if (err){
      throw err;
    } 
     else {
      var enteredPhoneNumber = req.body.username;
      var allPhoneNumbers = []

     users.forEach(function(user){
      number = user.username
      allPhoneNumbers.push(number)
     })

     if (allPhoneNumbers.some(x => x.toString() === enteredPhoneNumber.toString())) {
          res.render("registerationCheckingError",{enteredPhoneNumber:enteredPhoneNumber})
     } else {
      Branch.find({},function(err,branches){
        if (err) {
          throw err
        } else {
          res.render("registeration",{enteredPhoneNumber:enteredPhoneNumber,branches:branches})
        }
      })
          
     }


     }
  })
})



//Sign Up logic
router.post('/register',function(req, res) {
  
  Branch.findById(req.body.branchId,function(err,branch){
    if (err) {
      console.log(err)
    } else {
      
       var newUser = new User({
    username: req.body.username,
    fullName: req.body.fullName,
       email: req.body.email,
       post:req.body.post,
    Location:branch.Location,
  currentBranch:{
           id:branch._id,
           BranchName:branch.BranchName,
           Location:branch.Location
         } 
  })
       
       User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate("local")(req, res, function() {
        
      })
    }
       
        var newMember = {
          id:user._id,
          username:user.username,
          fullName:user.fullName,
          email:user.email,
          post:user.post,
          profileImage:user.profileImage
        } 
        
        branch.Members.push(newMember);
         branch.save()
         
         res.redirect('/');
  })

      
    }
  })
  
  
 




  
});


/////////////////////Login route///////////////////////////
router.get('/login',function(req,res){
  Branch.find({},function(err,branches){
    if (err) {
      console.log(err);
    } else {
      
      res.render('index',{branches:branches});
        }
  })
});

//login logic
// app.post('/login',middleware,callback)
router.post('/login', passport.authenticate("local", {
  successRedirect: "/homepage",
  failureRedirect: "/"
}), function(req, res) {

});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


router.get('/createBranch', function(req, res) {
  res.render('addBranch')
});

router.post('/createBranch', upload.single('file'),function(req, res) {

cloudinary.uploader.upload(req.file.path,
    function(result){

  var newBranch = {
    Location: req.body.Location,
    BranchName: req.body.BranchName,
    TotalSeats: req.body.TotalSeats,
    BranchPhoto : result.secure_url
  }
 
  Branch.create(newBranch,function(err,branch){
    if (err) {
      console.log(err)
    } else {
      res.redirect("/createBranch")
    }
  })
  })
  
});

////////////////// #### Middleware ##### for checking if user is logged in or not//////////////////////////////////////
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {

    res.render('login');
  }
}









//==================================================forgot=============================+//



// forgot password
router.get('/forgot', function(req, res) {
  res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: process.env.GMAILACCOUNT,
          pass: process.env.GMAILPASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'पालघर पोलीस  ट्रान्सफर सिस्टिम ',
        subject: 'पालघर पोलीस  ट्रान्सफर सिस्टिम ',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect("/forgot");
  });
});



router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: process.env.GMAILACCOUNT,
          pass: process.env.GMAILPASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'पालघर पोलीस  ट्रान्सफर सिस्टिम ',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/homepage');
  });
});













module.exports = router;