var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) { return sumSoFar + item; };

// do the job
var total = items.reduce(reducer, 30);

console.log(total); // 1130




var items = [10, 120, 1000];

// our reducer function
var mapData = function add(item, idx) { 
	console.info("item : " + item);
	console.info("idx : " + idx);

	return item + idx; };

// do the job
var total = items.map(mapData);

console.log(total); //10,121,1002