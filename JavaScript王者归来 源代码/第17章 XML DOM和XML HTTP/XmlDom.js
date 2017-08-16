/*XmlDom.js - 首先写一个通用的JavaScript脚本文件，创建一个跨浏览器的XmlDom类型*/
function XmlDom() {
    //通过对象/属性检测法，判断是IE还是Mozilla
    if (window.ActiveXObject) {
	//如果是IE，做法和之前17.1.2.1节看到的一样
        var arrSignatures = ["MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0",
                             "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument",
                             "Microsoft.XmlDom"];
                         
        for (var i=0; i < arrSignatures.length; i++) {
            try {
        		//依次测试每一个版本的MSXML对象是否能正常工作
                var oXmlDom = new ActiveXObject(arrSignatures[i]);
            
				//若能，则返回该对象
                return oXmlDom;
        	} 
			catch (oError) {
                //否则，忽略异常，检测下一个对象
            }
        }          

        throw new Error("MSXML is not installed on your system.");              
    } 
	//如果实现了标准接口
	else if (document.implementation && document.implementation.createDocument) {
        //那么使用标准接口构造XMLDOM对象
        var oXmlDom = document.implementation.createDocument("","",null);

        //创建Mozilla版本的parseError对象
        oXmlDom.parseError = {
            valueOf: function () { return this.errorCode; },
            toString: function () { return this.errorCode.toString() }
        };
        
        //初始化parseError对象
        oXmlDom.__initError__();
                
        //注册load事件
        oXmlDom.addEventListener("load", function () {
            this.__checkForErrors__();
            this.__changeReadyState__(4);
        }, false);

		//返回这个对象
        return oXmlDom;        
    } 
	else {
		//如果既没有MSXML也没有标准实现接口，抛出异常
        throw new Error("Your browser doesn't support an XML DOM object.");
    }
}

//如果是Mozilla
if (navigator.userAgent.indexOf("Mozilla/5.") == 0 && navigator.userAgent.indexOf("Opera") == -1) {
	
//设置默认的readyState
Document.prototype.readyState = 0;
//声明onreadystatechange属性
    Document.prototype.onreadystatechange = null;

    //处理状态变化
    Document.prototype.__changeReadyState__ = function (iReadyState) {
        this.readyState = iReadyState;

        if (typeof this.onreadystatechange == "function") {
			//回调onreadystatechange事件
            this.onreadystatechange();
        }
    };
    //初始化parseError对象
    Document.prototype.__initError__ = function () {
        this.parseError.errorCode = 0;
        this.parseError.filepos = -1;
        this.parseError.line = -1;
        this.parseError.linepos = -1;
        this.parseError.reason = null;
        this.parseError.srcText = null;
        this.parseError.url = null;
    };
    
//转换和处理parseError对象，因为Mozilla的parseError对象是一个XML文档
    Document.prototype.__checkForErrors__ = function () {

        if (this.documentElement.tagName.toLowerCase() == "parsererror") {
			
				//用正则表达式进行解析
            var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column (\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;

            reError.test(this.xml);
            
            this.parseError.errorCode = -999999;
            this.parseError.reason = RegExp.$1;
            this.parseError.url = RegExp.$2;
            this.parseError.line = parseInt(RegExp.$3);
            this.parseError.linepos = parseInt(RegExp.$4);
            this.parseError.srcText = RegExp.$5;
        }
    };
    
     //定义Mozilla的loadXML方法   
    Document.prototype.loadXML = function (sXml) {
    	//初始化parseError对象
        this.__initError__();
    	//状态变化-loading（模拟onreadystate事件）
        this.__changeReadyState__(1);
    	
		//构造DomParser对象
        var oParser = new DOMParser();
        //对Xml文本进行解析
var oXmlDom = oParser.parseFromString(sXml, "text/xml");

 		//先把自身的文档内容清空（多次读取的时候）
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
		
		//将新读取的内容添加上来
        for (var i=0; i < oXmlDom.childNodes.length; i++) {
            var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
            this.appendChild(oNewNode);
        }
        
        //载入后检查错误
        this.__checkForErrors__();
        
        //没有问题，设置readyState属性为4（模拟onreadystate事件）
        this.__changeReadyState__(4);

    };
    
	//保存原有的load()方法
    Document.prototype.__load__ = Document.prototype.load;
	
	/添加Document原型新的load方法，载入时读取文档
    Document.prototype.load = function (sURL) {
        this.__initError__();
        this.__changeReadyState__(1);
        this.__load__(sURL);
    };
    
	//定义DOM节点的xml属性
    Node.prototype.__defineGetter__("xml", function () {
        var oSerializer = new XMLSerializer();
        return oSerializer.serializeToString(this, "text/xml");
    });

}
