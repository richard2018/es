a=62;
//混淆编码的算法，这里面用到了一些嵌套的替换规则，比较复杂
//因为具体的混淆算法并不是本书介绍的主要内容，限于篇幅所限
//针对代码就不做具体的讲解和详细的注释了（因为解释起来需要长篇大论）
//编码函数
function encode() {
	var code = document.getElementById('code').value;
	code = code.replace(/[\r\n]+/g, '');
	code = code.replace(/'/g, "\\'");
	var tmp = code.match(/\b(\w+)\b/g);
	tmp.sort();
	var dict = [];
	var i, t = '';
	for(var i=0; i<tmp.length; i++) {
		if(tmp != t) dict.push(t = tmp);
	}
	var len = dict.length;
	var ch;
	for(i=0; i<len; i++) {
			ch = num(i);
			code = code.replace(new RegExp('\\b'+dict+'\\b','g'), ch);
			if(ch == dict) dict = '';
	}
	document.getElementById('code').value = 
	"eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}("
	   + "'"+code+"',"+a+","+len+",'"+ dict.join('|')+"'.split('|'),0,{}))";
}

function num(c) {
	return(c<a?'':num(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36));
}

function run() {
	eval(document.getElementById('code').value);
}
//解码函数
function decode() {
	var code = document.getElementById('code').value;
	code = code.replace(/^eval/, '');
	document.getElementById('code').value = eval(code);
}
