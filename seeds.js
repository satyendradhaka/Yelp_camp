var mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment		= require("./models/comment")

var starts = [
	{
		name: "Dawki",
		image: "https://travenjo.com/wp-content/uploads/2019/06/Camping-Dawki-Shnongpdeng.jpg?x42282",
		description: "Nunc ultrices dui sit amet orci venenatis, nec semper sem gravida. Nunc quis justo eu orci dictum imperdiet. Donec ligula lorem, ultricies ut faucibus non, lacinia non orci. Quisque vitae condimentum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce egestas lacus non ultrices pulvinar. Vestibulum cursus justo sed mattis eleifend. Cras consequat, odio eget posuere sodales, quam metus volutpat diam, ut tempus mi massa id purus. Cras eleifend, tortor laoreet lobortis sagittis, metus ligula lobortis mauris, sit amet placerat enim mi sit amet mauris. Donec gravida ornare urna, vel ullamcorper velit. Morbi pulvinar nulla nec vulputate luctus. Morbi auctor pretium nisl, vitae imperdiet magna pretium at. Donec sed volutpat urna, eu consectetur risus. Suspendisse ac quam eu nibh tincidunt feugiat finibus interdum quam. Aliquam erat volutpat."
	},
	
	{
		name: "dzuako valley",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-4G1Dgd_92HY40i2By4YQUsM5ibTrmrSIwhK6UwKpGxlfFgVB&usqp=CAU",
		description: "Morbi eget lectus vehicula, accumsan est quis, dapibus magna. Curabitur leo ligula, facilisis at sem eu, laoreet dignissim massa. In elementum mattis augue, id finibus justo accumsan sit amet. Morbi viverra, urna et rhoncus pellentesque, nulla ex sagittis est, eget eleifend urna elit ut felis. Nulla sagittis sem quis purus semper pellentesque. Aenean nec ex ligula. Nulla pretium enim ac erat euismod, at volutpat sapien suscipit. Praesent volutpat, magna quis venenatis feugiat, sem eros euismod risus, eu aliquam nulla massa nec orci. Vivamus sollicitudin massa ipsum, nec euismod neque scelerisque in. Suspendisse a lacinia purus. Aliquam iaculis risus enim, tincidunt sodales enim luctus vel. Fusce rutrum elit sit amet ex consequat, non rhoncus purus consectetur."
	},
	{
		name: "fuck valley",
		image: "https://res.cloudinary.com/wandertrails/image/upload/q_auto/c_scale/w_444,h_303,c_fill,fl_progressive/IMG_4788_bfun3r",
		description: "Sed non malesuada ante. Nullam ac eleifend mauris. Nullam pharetra ut est at vulputate. Pellentesque interdum turpis a nisi pellentesque mattis. Vestibulum eu ligula eu risus pharetra ullamcorper et id libero. Duis laoreet vel diam at mattis. Suspendisse imperdiet mi dui, sed viverra augue rutrum ut. Mauris lacus enim, maximus et sapien et, dignissim dignissim justo. Aliquam rhoncus congue risus, in blandit neque sollicitudin nec. Sed quis arcu ut metus condimentum blandit. Vivamus tincidunt, risus id egestas scelerisque, lectus odio faucibus sapien, vel accumsan lorem enim eget metus. Aenean scelerisque consequat faucibus. Nam vel dolor arcu. Nunc tincidunt iaculis lacus."
	}
]

function seedDB(){
	//remove all campgrounds
	Campground.deleteMany({}, function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds");
	//add few campgrounds
	starts.forEach(function(seed){
	Campground.create(seed, function(err,campground){
	if(err){
	console.log(err);
	}else{
	console.log("added a campground");
	//create a comment
	Comment.create(
	{
	text: "fjnjnkjdnkjfdnckjdfncf",
	author: "jingalala"
	}, function(err, comment){
	if(err){
	console.log(err);
	}else{
	campground.comments.push(comment);
	campground.save();
	console.log("Created new comment");
	}
	}
	)
	}
	});
	})
	
	});
	
	//add few comments
}

module.exports = seedDB;
