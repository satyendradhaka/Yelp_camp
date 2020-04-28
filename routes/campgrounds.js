var express = require("express"),
	router  = express.Router(),
	Campground=require("../models/campground"),
	middleware=require("../middleware");

//index page or view all campgrounds
router.get("/", function(req, res){
	//get campgrounds from db
	Campground.find({},function(err, allcamps){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allcamps});
		}
	});
});
//form for creating a new campground
router.get("/new", middleware.isLoggedIn,function(req, res){
	res.render("campgrounds/new");
});
//handeling logic for creating a new campground
router.post("/", middleware.isLoggedIn,function(req, res){
	// data from form
	var name= req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author= {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, price: price,image: image, description: description, author: author};
	
	//add new campground to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});
//showing campground details
router.get("/:id", function(req, res){
	//find out campground with id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	//res.send("This will be the show page");
	
});


//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req,res){	
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
		});
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
	//find and update the campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
