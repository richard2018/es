/* 特性（Attributes）是一种崭新的声明性信息。

我们不仅可以通过特性来定义设计层面的信息

（例如help file, URL for documentation）

以及运行时（run-time）信息（例如使XML与class相联系），

而且我们还可以利用特性建立自描述（self-describing）组件。

*/

//Attribute 基类,可以自行定义其中的接口以扩充功能
function Attribute()  
{

}

Attribute.useAttributes = function(func) 
{
	 var attributeDef = /\[.+\].*\n.*(?=\=[\s]*function)/g;
	 var matches = func.toString().match(attributeDef);
	 //alert(matches[0]);
	 if(matches != null)
	 {
		  for (var i = 0; i < matches.length; i++)
		  {
			   var part = matches[i].split(/[\s\n]/);
			   var attrLists = part[0].replace(/\]\[/,"]\xff[").split("\xff");
			   var methodObj = eval(part[part.length-1]);
			   if(methodObj.__attributes == null)
			   {
					methodObj.__attributes = new Array();
					methodObj.__attributes.__all = new Array();
			   }

			   for (var j = 0; j < attrLists.length; j++)
			   { 
					if(!/^.+\(.*\)$/.test(attrLists[j].slice(1,-1)))
					{
						attrLists[j] = "[" + attrLists[j].slice(1,-1) + "()" + "]"; 
					}
					if(!/^.+Attribute$/.test(attrLists[j].split("(")[0]))
					{
						attrLists[j] = attrLists[j].split("(")[0] + "Attribute" + "(" + attrLists[j].split("(")[1];
					}

					var attrObj = eval(eval(attrLists[j])[0]);
					if(methodObj.__attributes[attrLists[j].split("(")[0].replace(/[\[\]]/g,"").replace(/Attribute$/g,"")] == null)
					{
						methodObj.__attributes.__all.push(attrObj);
						methodObj.__attributes[attrLists[j].split("(")[0].replace(/[\[\]]/g,"").replace(/Attribute$/g,"")] = attrObj;
						methodObj.__attributes[attrLists[j].split("(")[0].replace(/[\[\]]/g,"")] = attrObj;
					}
			   }
		  }
	 }
}