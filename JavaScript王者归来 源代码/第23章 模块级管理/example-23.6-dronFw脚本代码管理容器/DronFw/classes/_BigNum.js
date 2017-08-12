/*******************************************\
  大数类（2006-12-4）
  非 Dron 原创，作者佚名
  Dron 尊重原作者版权，请原作者见到后与 Dron 联系
  QQ:100004400
\*******************************************/
DronFw.Class.BigNum = function (str, n, b)
{

	this.recalc = function() /* 去除前缀的 0，并重新计算小数点位置 */
	{
		for(var i = 0; i < 17; i ++)
		{
			if(this.data[0] != 0) break;

			this.data.shift();
			this.data.push(0);
			this.decimal_place --;
		}
	}

	this.init = function() /* 部分初始化工作 */
	{
		this.decimal_place = Math.ceil( n / 7 ); //小数点位置

		this.data = new Array(17); //保存有效数位的数组
		
		if(n % 7 > 0)
		{
			var arr = new Array( 8 - n % 7 );
		}
		else
		{
			var arr = new Array( 1 - n % 7 );
		}

		str = arr.join("0") + str;

		if(str.length > 119)
		{
			str = str.substr(0, 119);
		}
		else if(str.length < 119)
		{
			var arr = new Array(120 - str.length);
			str += arr.join("0");
		}

		for( var i = 0; i < 17; i ++ )
		{
			this.data[i] = parseInt( str.substr(i * 7, 7) , 10 );
		}
	}

	/* 初始化开始 */

	this.positive = b;

	if( ! /^0*$/.test(str) )
	{
		this.init();
		this.recalc();
	}
	else
	{
		this.data = new Array(17);

		for( var i = 0; i < 17; i ++ )
		{
			this.data[i] = 0;
		}

		this.decimal_place = 0;
	}

	/* 初始化结束 */



	this.Add = function(num) /* 加法 */
	{
		if(this.positive && !num.positive)
		{
			num.positive = true;
			var result = this.Subtract(num);
			num.positive = false;
			return result;
		}
		else if(num.positive && !this.positive)
		{
			this.positive = true;
			var result = num.Subtract(this);
			this.positive = false;
			return result;
		}

		var result = new BigNum("", 0, this.positive);

		var num1,num2;
		if(this.decimal_place >= num.decimal_place)
		{
			num1 = this;
			num2 = num;
		}
		else
		{
			num1 = num;
			num2 = this;
		}

		result.decimal_place = num1.decimal_place;

		if(num1.decimal_place - num2.decimal_place >= 17)
		{
			for(var i = 0; i < 17; i ++)
			{
				result.data[i] = num1.data[i];
			}
			
			return result;
		}

		var nOffDec = num1.decimal_place - num2.decimal_place;
		var nTmp = 0;

		for( var i = 16; i >= 0; i -- )
		{
			var nTmp1 = i - nOffDec;
			var nTmp2 = 0;

			if(nTmp1 >= 0)
			{
				nTmp2 = num1.data[i] + num2.data[nTmp1];
			}
			else
			{
				nTmp2 = num1.data[i];
			}

			nTmp2 += nTmp;
			nTmp = Math.floor(nTmp2 / 10000000);
			result.data[i] = nTmp2 % 10000000;
		}

		if(nTmp > 0)
		{
			result.data.unshift(nTmp);
			result.decimal_place ++;
		}

		return result;
	}

	this.Subtract = function(num) /* 减法 */
	{
		if(this.positive && !num.positive)
		{
			num.positive = true;
			var result =  this.Add(num);
			num.positive = false;
			return result;
		}
		else if(!this.positive && num.positive)
		{
			this.positive = true;
			var result = this.Add(num);
			result.positive = false;
			this.positive = false;
			return result;
		}
		else
		{
			var num1 = num2 = null;
			var bPositive;

			if(this.decimal_place > num.decimal_place)
			{
				num1 = this;
				num2 = num;
				bPositive = this.positive;
			}
			else if(this.decimal_place < num.decimal_place)
			{
				num1 = num;
				num2 = this;
				bPositive = !this.positive;
			}
			else
			{
				for( var i = 0; i < 17; i ++ )
				{
					if(this.data[i] > num.data[i])
					{
						num1 = this;
						num2 = num;
						bPositive = this.positive;
						break;
					}
					else if(this.data[i] < num.data[i])
					{
						num1 = num;
						num2 = this;
						bPositive = !this.positive;
						break;
					}
				}
			}

			if( num1 == null)
			{
				return new BigNum("", 0, true);
			}
			else
			{
				if(num1.decimal_place - num2.decimal_place >= 17)
				{
					var result = new BigNum("", 0, bPositive);

					for(var i = 0; i < 17; i ++)
					{
						result.data[i] = num1.data[i];
					}
					
					result.decimal_place = num1.decimal_place;

					return result;
				}

				var result = new BigNum("", 0, bPositive);
				result.decimal_place = num1.decimal_place;

				var nOffDec = num1.decimal_place - num2.decimal_place;
				var nTmp = 0;

				for( var i = 16; i >= 0; i -- )
				{
					var nTmp1 = i - nOffDec;
					var nTmp2 = 0;

					if(nTmp1 >= 0)
					{
						nTmp2 = 10000000 + nTmp + num1.data[i] - num2.data[nTmp1];
					}
					else
					{
						nTmp2 = 10000000 + nTmp + num1.data[i];
					}

					if(nTmp2 >= 10000000)
					{
						result.data[i] = nTmp2 - 10000000;
						nTmp = 0;
					}
					else
					{
						result.data[i] = nTmp2;
						nTmp = -1;
					}
				}

				result.recalc();
				return result;
			}
		}
	}

	this.Multiply = function(num) /* 乘法 */
	{
		var bPositive;

		var nDecimalPlace = this.decimal_place + num.decimal_place - 1;

		if(this.positive == num.positive)
		{
			bPositive = true;
		}
		else
		{
			bPositive = false;
		}

		var result = new BigNum("", 0, bPositive);
		var nTmpData = 0;

		for( var i = 16; i >= 0; i -- )
		{
			for( var j = 16; j >= 0; j -- )
			{
				if(isNaN(result.data[j + i]))
					result.data[j + i] = 0;
				result.data[j + i] += this.data[j] * num.data[i];

				if(result.data[j + i] >= 10000000)
				{
					if( j + i -1 >= 0 )
					{
						result.data[j + i -1] += Math.floor(result.data[j + i] / 10000000);
					}
					else
					{
						nTmpData += Math.floor(result.data[j + i] / 10000000);
					}

					result.data[j + i] = result.data[j + i] % 10000000;
				}
			}
		}

		if(nTmpData > 0)
		{
			result.data.unshift(nTmpData);
			result.data.pop();
			nDecimalPlace ++;
		}

		result.decimal_place += nDecimalPlace;
		return result;
	}

	this.Divide = function(num) /* 除法 */
	{
		var bPositive;

		var nDecimalPlace = this.decimal_place - num.decimal_place + 1;

		if(this.positive == num.positive)
		{
			bPositive = true;
		}
		else
		{
			bPositive = false;
		}

		var result = new BigNum("", 0, bPositive);

		var arrTemp = new Array(17);

		for( var i = 0; i < 17; i ++ )
		{
			arrTemp[i] = this.data[i];
		}

		var bTest = true;
		var nTest = 0;

		for( var i = 0; i < 17; i ++ )
		{
			if(bTest)
			{
				nTest = Math.floor( ( arrTemp[0] * 10000000 +  arrTemp[1] ) / ( num.data[0] * 10000000 + num.data[1] ) );
			}
			else
			{
				bTest = true;
			}

			if(nTest == 0)
			{
				result.data[i] = 0;
				arrTemp[1] += arrTemp[0] * 10000000;
				arrTemp.shift();
				arrTemp.push(0);
				continue;
			}

			var arrTemp1 = new Array(17);
			for( var j = 0; j < 17; j ++ )
			{
				arrTemp1[j] = 0;
			}

			for( var j = 16; j >= 0; j -- )
			{
				arrTemp1[j] += nTest * num.data[j];
				if(arrTemp1[j] >= 10000000)
				{
					if(j != 0)
					{
						arrTemp1[j - 1] += Math.floor( arrTemp1[j] / 10000000);
						arrTemp1[j] = arrTemp1[j] % 10000000;
					}
				}
			}

			for( var j = 0; j < 17; j ++ )
			{
				if(arrTemp[j] < arrTemp1[j])
				{
					bTest = false;
					break;
				}
				else if(arrTemp[j] > arrTemp1[j])
				{
					break;
				}
			}
		
			if(bTest)
			{
				result.data[i] = nTest;

				for( var j = 16; j >= 0; j -- )
				{
					if(arrTemp[j] >= arrTemp1[j])
					{
						arrTemp[j] -= arrTemp1[j];
					}
					else
					{
						arrTemp[j] = 10000000 + arrTemp[j] - arrTemp1[j];
						arrTemp[j - 1] --;
					}
				}
			}
			else
			{
				nTest --;
				i --;

				continue;
			}
			
			arrTemp[1] += arrTemp[0] * 10000000;
			arrTemp.shift();
			arrTemp.push(0);
		}

		result.decimal_place = nDecimalPlace;
		result.recalc();
		
		return result;
	}

	this.SquareRoot = function() /* 平方根 */
	{
		var result = new BigNum("", 0, true);
		nDecimalPlace = Math.ceil(this.decimal_place / 2);

		var arrTemp = new Array(17);
		for(var i = 0; i < 17; i ++)
		{
			arrTemp[i] = this.data[i];
		}

		var bTest = true;

		for(var i = 0; i < 17; i ++)
		{
			if( i == 0 )
			{
				if(this.decimal_place % 2 == 0)
				{
					var nTemp = arrTemp[0] * 10000000 + arrTemp[1];
					var nTemp1 = Math.floor( Math.sqrt( nTemp ) );
					var nTemp2 = nTemp - nTemp1 * nTemp1;

					arrTemp[0] = 0;
					arrTemp[1] = nTemp2;
					arrTemp.shift();
					arrTemp.push(0);
				}
				else
				{
					var nTemp1 = Math.floor( Math.sqrt( arrTemp[0] ) );
					var nTemp2 = arrTemp[0] - nTemp1 * nTemp1;
					arrTemp[0] = nTemp2;
				}
			}
			else
			{
				if(bTest)
				{
					if( i == 1 )
					{
						nTemp1 = Math.sqrt( (arrTemp[0] * 10000000 + arrTemp[1]) + 100000000000000 * Math.pow(result.data[0], 2) ) - 10000000 * result.data[0];
						nTemp1 = Math.floor(nTemp1);
					}
					else
					{
						nTemp = result.data[0] * 10000000 + result.data[1];
						nTemp1 = Math.floor( ( arrTemp[0] * 10000000 + arrTemp[1] ) / ( 2 * nTemp ) );
					}
				}
				else
				{
					bTest = true;
				}

				var arrTemp1 = new Array(17);
				var nTemp3 = 0
				for( var j = i - 1; j >= 0; j -- )
				{
					arrTemp1[j] = result.data[j] * 2 + nTemp3;
					if( arrTemp1[j] >= 10000000 && j > 0 )
					{
						nTemp3 = 1;
						arrTemp1[j] = arrTemp1[j] % 10000000;
					}
					else
					{
						nTemp3 = 0;
					}
				}

				arrTemp1[i] = nTemp1;
				nTemp3 = 0;
				
				for( var j = i; j >= 0; j -- )
				{
					arrTemp1[j] = arrTemp1[j] * nTemp1 + nTemp3;
					if( arrTemp1[j] >= 10000000 && j > 0 )
					{
						nTemp3 = Math.floor( arrTemp1[j] / 10000000 );
						arrTemp1[j] = arrTemp1[j] % 10000000;
					}
					else
					{
						nTemp3 = 0;
					}
				}

				var arrTemp2 = new Array(17);
				for( var j = 0; j < 17; j ++ )
				{
					arrTemp2[j] = arrTemp[j];
				}

				for( var j = i; j >= 0; j -- )
				{
					if( arrTemp2[j] >= arrTemp1[j] )
					{
						arrTemp2[j] -= arrTemp1[j];
					}
					else
					{
						if(j > 0)
						{
							arrTemp2[j] = arrTemp2[j] + 10000000 - arrTemp1[j];
							arrTemp2[j - 1] --;
						}
						else
						{
							bTest = false;
							break;
						}
					}
				}
				
				if(bTest)
				{
					arrTemp = arrTemp2;
				}
				else
				{
					nTemp1 --;
					i --;
					continue;
				}
			}

			result.data[i] = nTemp1;
			arrTemp[1] += arrTemp[0] * 10000000;
			arrTemp.shift();
			arrTemp.push(0);
		}
		
		result.decimal_place = nDecimalPlace;
		result.recalc();
		return result;
	}

	this.toString = function() /* 转换为字符串（包括小数点），以便以文本形式输出计算结果 */
	{
		var szData = "";
		var szOutPut = "";

		this.recalc();

		for( var i = 0; i < 17; i ++ )
		{
			var szTmpData = this.data[i].toString()
			var arr = new Array(8 - szTmpData.length);
			szData += arr.join("0") + szTmpData;
		}

		if( /^0*$/.test(szData) )
		{
			return "0";
		}

		var n = this.decimal_place * 7;

		for(var i = 0; i < 7; i++)
		{
			if(szData.substr(i, 1) != 0) break;
			n --;
		}

		szData = szData.replace(/^0+/g,"");
		szData = szData.substr(0, 101);
		szData = szData.replace(/0+$/g,"");

		if( n < 1 )
		{
			szOutPut = szData.substr(0, 1) + 
				( ( szData.length > 1 ) ? "." : "" ) + 
				szData.substr(1) + "e" + ( n - 1 ).toString();
		}
		else if(n == szData.length)
		{
			szOutPut = szData;
		}
		else if(n > szData.length)
		{
			szOutPut = szData.substr(0, 1) + "." + szData.substr(1) + "e+" + (n - 1).toString();
		}
		else
		{
			szOutPut = szData.substr(0, n) + "." + szData.substr(n);
		}

		return ( this.positive ? "" : "-" ) + szOutPut;
	}

	this.Clone = function()	/* 复制 */
	{
		var result = new BigNum("", 0, true);

		for( var i = 0; i < 17; i ++)
		{
			result.data[i] = this.data[i];
		}

		result.decimal_place = this.decimal_place;
		result.positive = this.positive;

		return result;
	}
}