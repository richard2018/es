/** Mozilla兼容MsIE脚本，stylesheet扩展部分。
	o.stylesheet.addRule()
**/
(function () {
	//如果CSSStyleSheet属性未定义，返回
	if (! window.CSSStyleSheet) return;
	
	//返回cssRules的私有方法
	function _ss_GET_rules_ () {
		return this.cssRules;
	}

	//CSSStyleSheet原型
	var _ss = CSSStyleSheet.prototype;

	//添加addRule方法
	_ss.addRule = function(sSelector, sRule) {
		this.insertRule(sSelector + "{" + sRule + "}", this.cssRules.length);
	}

	//利用__defineGetter__为CSSStyleSheet设置rules属性
	_ss.__defineGetter__("rules", _ss_GET_rules_);
})();
