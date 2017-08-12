function MyDate()
{
}
MyDate.prototype = new Date();
var date = new MyDate();
alert(date.toGMTString);
//原型继承法的表现似乎不错，这一次终于获得了基类的方法，然而，令人吃惊的是，当你尝试调用date对象的toString或toGMTString方法时，Internet Explorer抛出一个怪异的异常，说，“‘[object]’不是日期对象”。功败垂成，看来原型继承法还是不能解决核心对象的继承问题。
