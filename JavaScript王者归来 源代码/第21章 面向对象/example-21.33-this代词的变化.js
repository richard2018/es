function Foo()
{
	alert(this.x + this.y);
}
//�ö���{x:1,y:2}���ã��൱��alert(1+2);
Foo.call({x:1, y:2});
