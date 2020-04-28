var express = require("express"),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	router  = express.Router({mergeParams: true}),
	middleware=require("../middleware");

//form route for adding new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
				res.render("comments/new", {campground: campground});
		}
	});

});
//handeling logic for adding new comment
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		}else{
			//create a new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id= req.user._id;
					comment.author.username=req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Comment added successfully")
					res.redirect('/campgrounds/' + campground._id);
				}
			})
		}
		
	})
});

//edit comments form
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		
		}
	});
});

//handel logic for updating comments
router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})

//delete comment route
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
	//find by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success", "Comment deleted successfully")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;

