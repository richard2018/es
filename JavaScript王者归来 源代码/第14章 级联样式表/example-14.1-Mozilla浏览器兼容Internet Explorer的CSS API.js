/** Mozilla����MsIE�ű���stylesheet��չ���֡�
	o.stylesheet.addRule()
**/
(function () {
	//���CSSStyleSheet����δ���壬����
	if (! window.CSSStyleSheet) return;
	
	//����cssRules��˽�з���
	function _ss_GET_rules_ () {
		return this.cssRules;
	}

	//CSSStyleSheetԭ��
	var _ss = CSSStyleSheet.prototype;

	//���addRule����
	_ss.addRule = function(sSelector, sRule) {
		this.insertRule(sSelector + "{" + sRule + "}", this.cssRules.length);
	}

	//����__defineGetter__ΪCSSStyleSheet����rules����
	_ss.__defineGetter__("rules", _ss_GET_rules_);
})();
