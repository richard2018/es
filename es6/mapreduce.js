var Job = { 
//待处理的数据 
data : [ 
"We are glad to see you here. This site is dedicated to", 
"poetry and to the people who make poetry possible", 
"poets and their readers. FamousPoetsAndPoems.com is", 
"a free poetry site. On our site you can find a large", 
"collection of poems and quotes from over 631 poets", 
"Read and Enjoy Poetry", 
"I, too, sing America", 
"I am the darker brother", 
"They send me to eat in the kitchen", 
"When company comes", 
"But I laugh", 
"And eat well", 
"And grow strong", 
"Tomorrow", 
"Ill be at the table", 
"When company comes", 
"Nobodyll dare", 
"Say to me", 
"Eat in the kitchen", 
"Then", 
"Besides", 
"Theyll see how beautiful I am", 
"And be ashamed", 
"I, too, am America" 
], 
//将数据中的每行字符串用空格分隔开， 
//并"重组"成诸如{key: 单词, value: 1}格式的对象，返回对象数组 
map : function(line) { 
	console.info("lien : " + line)
var splits = line.split(" "); 
var temp = []; 
for(var i=0; i<splits.length; i++) { 
temp.push({key : splits[i], value : 1}); 
} 
return temp; 
}, 
//计算每个单词在"数据"（data）中出现的次数 
reduce : function(allSteps) { 
	debugger;
var result = {}; 
for(var i=0; i<allSteps.length; i++) { 
var step = allSteps[i]; 
console.info("step : " + step);
result[step.key] = result[step.key] ? (result[step.key] + 1) : 1; 
} 
return result; 
}, 
//初始化，同时是运行的入口。 
init : function() { 
var allSteps = []; 
for(var i=0; i<Job.data.length; i++) { 
//如果这里能多线程调用Job.map函数就更逼真了。？？ 
allSteps = allSteps.concat(Job.map(Job.data[i])); 
} 
//美中不足，这里不能多线程调用Job.reduce函数？？ 
var result = Job.reduce(allSteps) 
console.log(JSON.stringify(result)); 
} 
}; // Job 
//开始执行 
Job.init(); 