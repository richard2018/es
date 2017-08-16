function Foo()
{
	alert(this.x + this.y);
}
//用对象{x:1,y:2}调用，相当于alert(1+2);
Foo.call({x:1, y:2});
