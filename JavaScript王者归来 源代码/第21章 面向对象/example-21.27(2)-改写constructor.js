function ArrayList()
{
	var ret = new Array();
	ret.constructor = this.constructor;
		//��дconstructor������ʵ���̳еĶ����constructor����ֵ�Ե����ԡ�������һЩ
	return ret;
}
