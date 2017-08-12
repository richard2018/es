function compile(code)
{
	code = code.replace(/@import\s(\w+)/, "$import('$1'); ");
	//这个例子自动将@import abc替换成$import('abc');
	//后者才是符合JavaScript语法的写法
	return eval(code);
}
