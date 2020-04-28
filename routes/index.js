var express = require("express"),
	router  = express.Router(),
	passport= require("passport"),
	User	= require("../models/user");

//landing page route
router.get("/", function(req, res){
	res.render("landing");
});

//Auth Routes

//show register form
router.get("/register", function(req, res){
	res.render("register");
})

//handel sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Yelp Camp " + user.username);
			res.redirect("/campgrounds")
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});
//handel login logic
router.post("/login", passport.authenticate("local", 
	{
	successRedirect: "/campgrounds", 
	failureRedirect: "/login"
	}),function(req, res){

});

//logout route

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged u out");
	res.redirect("/campgrounds");
});


module.exports = router;

