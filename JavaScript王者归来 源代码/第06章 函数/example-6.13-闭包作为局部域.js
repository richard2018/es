(function(){
	var defaultX = 0;		//局部域
	var defaultY = 0;		//局部域

	Point = function(x, y)  //全局域
	{
		this.x = x || defaultX;
		this.y = y || defaultY;
	}
})();
