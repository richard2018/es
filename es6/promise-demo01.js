var promise = new Promise(function(resolve, reject) {
	 if (true){
		console.info("true...");
//	 resolve("success");
	 } else {
		console.info("false...");
//	 reject("failuer");
	 }
	});

	promise.then(function(value) {
	 // success
	console.info("promise success");
	}, function(value) {
	 // failure
	console.info("promise failure")
	});