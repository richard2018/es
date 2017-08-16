/**
 * 调用jsvm2提供的$package函数定义包名
 * 作用相当于：if (!window.example) {window.example = {};}
 */
$package("example");

/**
 * 对example.HelloWorld进行定义
 */
example.HelloWorld = function (name) {

   this.name = name;

   this.say = function () {
      alert(this.name + " say: hello world!");
   }

}