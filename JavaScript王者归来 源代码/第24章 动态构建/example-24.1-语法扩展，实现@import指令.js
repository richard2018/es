function compile(code)
{
	code = code.replace(/@import\s(\w+)/, "$import('$1'); ");
	//��������Զ���@import abc�滻��$import('abc');
	//���߲��Ƿ���JavaScript�﷨��д��
	return eval(code);
}
