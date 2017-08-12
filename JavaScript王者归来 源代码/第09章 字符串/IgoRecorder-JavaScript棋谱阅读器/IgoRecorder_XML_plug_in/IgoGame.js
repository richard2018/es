/**************************************************************************\
 *   IgoElf Javascript Parser Ver 1.00                                    *
 *   Author akira_cn@msn.com                                              *   
 *   Copyright (c) 2004 all rights reserved                               *
\**************************************************************************/

/**************************************************************************\
 *   Class Igo Game                                                       *
\**************************************************************************/

function IgoGame(steps, panel, startIdx)
{
	if (startIdx == null)
	{
		this.startIndex = 0;
	}
	else
	{
		this.startIndex = startIdx;
	}
	//public
	this.initBoard = IgoGame_Initialize;	   		//初始化棋盘
	this.moveForwards = IgoGame_MoveForwards;		//下一手
	this.moveBackwards = IgoGame_MoveBackwards;		//前一手
	this.nextComment = IgoGame_MoveNextComment;     //下一解说
	this.prevComment = IgoGame_MovePrevComment;     //前一解说
	this.goStep = IgoGame_GoStep;					//到指定步
	this.setComment = IgoGame_setComment;			//设置解说
	this.setLabel = IgoGame_setLabel;               //设置标记

	//private
	this.Steps = steps;								//棋谱序列
	this.panel = panel;								//显示棋谱的面板对象
	this.currentStep = 0;							//当前步数

	this.board = IgoGame_InitBoard(); 		        //当前步棋盘状态

	this.applyStep = IgoGame_ApplyStep;	             //绘制单步棋谱
	this.toStep = IgoGame_ParseStep;		         //解析棋谱文本
	this.removeStep = IgoGame_RemoveStep;	         //反绘制单步棋谱
	this.removeStone = IgoGame_RemoveStone;			 //提起棋子
	this.draw = IgoGame_DrawStep;                    //将当前棋谱绘制到面板对象
	this.testTake = IgoGame_TestTake;                //提子判断
	this.getStone = IgoGame_getBoardStone;           //获取棋子颜色
	this.canTake = IgoGame_CanTake;					 //判断是否能够提子
	this.take = IgoGame_Take;						 //提子
	this.putStone = IgoGame_PutStone;                //落子
	this.comment = null;							  //解说
	this.appendComment = IgoGame_AppendComment;       //添加注释
	this.takeSelf = false;                            //判断自杀
	this.label = null;                                //标记
	this.appendLabel = IgoGame_AppendLabel;			  //添加标记

	this.isShowLab = true;                            //设定是否显示文字标记（不包括添加黑白子）
	this.isTake = IgoGame_isTake;                     //判断是否提子
	this.stonesTake = null;                           //被提的棋子
}

function IgoGame_setLabel(label) //设置标记 格式：step,mark[xy];step,mark[xy];
{
	var index = 0;
	
	while(index != -1)
	{
		index = label.indexOf(';');
		if (index >= 0)
		{
			var aLabel = label.substring(0, index);
			var separator = aLabel.indexOf(',');
			if (separator >= 0)
			{
				var step = aLabel.substring(0, separator);
				var mark = aLabel.substring(separator+1, aLabel.length);
				this.appendLabel(new Label(step, IgoGame_getPosition(mark)));
			}
			label = label.substring(index+1, label.length);
		}
	}
}

function IgoGame_setComment(comm) //设置解说 格式：step,comment;step,comment;......
{
	var index = 0;
	
	while(index != -1)
	{
		index = comm.indexOf(';');
		if (index >= 0)
		{
			var aComment = comm.substring(0, index);
			var separator = aComment.indexOf(',');
			if (separator >= 0)
			{
				var step = aComment.substring(0, separator);
				var text = aComment.substring(separator+1, aComment.length);
				this.appendComment(new Comment(step, text));
			}
			comm = comm.substring(index+1, comm.length);
		}
	}
}

function IgoGame_AppendLabel(lab)  //添加标记
{
	if (this.label == null)
	{
		this.label = lab;
	}
	else
	{
		this.label.append(lab);
	}
}

function IgoGame_AppendComment(comm) //添加解说
{
	if (this.comment == null)
	{
		this.comment = comm;
	}
	else
	{
		this.comment.append(comm);
	}
}

function IgoGame_Initialize()   //初始化棋盘
{
	this.board = IgoGame_InitBoard();
	this.takeSelf = false;
	this.stonesTake = null;
	this.draw();
}

function IgoGame_MoveForwards() //下一步
{
	var st = this.toStep(++this.currentStep + this.startIndex);
	if (st != null)
	{
		this.board = this.applyStep(st)
		this.testTake(IgoGame_getPosition(st));
		this.draw();
	}
	else
	{
		--this.currentStep;
	}
}

function IgoGame_MoveNextComment() //下一解说
{
	var comm = this.comment;
	if (comm == null)
	{
		alert("本棋谱没有解说！");
		return;
	}
	else
	{
		while (comm != null)
		{
			var st = comm.step;
			if (st > this.currentStep)
			{
				this.goStep(st);
				break;
			}
			comm = comm.next;
		}
	}
}
function IgoGame_MovePrevComment() //前一解说
{
	var comm = this.comment;
	if (comm == null)
	{
		alert("本棋谱没有解说！");
		return;
	}
	else
	{
		while (comm != null)
		{
			var st = comm.step;
			if (st < this.currentStep && (comm.next == null || comm.next.step >= this.currentStep))
			{
				this.goStep(st);
				break;
			}
			comm = comm.next;
		}
	}
}
function IgoGame_GoStep(step) //到指定步数
{
	var i = 1;
	var st = this.toStep(i);
	this.initBoard();
	this.currentStep = step;

	if (step < 1)
	{
		self.status = self.defaultStatus;
		step = 0;
	}

	step = (step - 0) + (this.startIndex - 0);
	while(i <= step && st != null)
	{
		this.currentStep = i - 1 - this.startIndex;
		this.board = this.applyStep(st)
		this.testTake(IgoGame_getPosition(st));
		i ++;
		st = this.toStep(i);
	}
	this.currentStep = i - 1 - this.startIndex;
	this.draw();
}

function IgoGame_MoveBackwards() //上一步
{
	if (this.currentStep <= 0)
	{
		return;
	}
	if (this.isTake() != null)
	{
		var take = this.isTake();
		while(take != null)
		{
			this.board = this.putStone(take.pos);
			take = take.next;
		}
		if (this.stonesTake == this.isTake())
		{
			this.stonesTake = null;
		}
		else
		{
			take = this.stonesTake;
			while(take != null)
			{
				if (take.next == this.isTake())
				{
					take.next = null;
					break;
				}
				take = take.next;
			}
		}
		//this.goStep(--this.currentStep);
	}
	this.board = this.removeStep(this.toStep((this.currentStep - 0) + (this.startIndex - 0)));
	this.currentStep--;
	this.draw();
}

function IgoGame_isTake() //判断是否提子
{
	var take = this.stonesTake;
	
	while (take != null)
	{
		if (take.step >= this.currentStep)
		{
			break;
		}
		take = take.next;
	}
	return take;
}
function IgoGame_ParseStep(step) //解析棋谱
{
	if (step <= 0)
	{
		step = 0;
		self.status = self.defaultStatus;
		return;
	}
	
	var stepList = this.Steps;
	var index = 0;
	var st = 0;
	var stepString = null;

	while (index != -1)
	{
		index = stepList.indexOf(';');
		st ++;
		if (index >= 0 && st >= step)
		{
			stepString = stepList.substring(0, index);
			break;
		}
		stepList = stepList.substring(index+1, stepList.length);
	}
	if (step == this.currentStep && StatusText == StatusText1)
	{
		self.status = StatusText + ":" + stepString;
	}
	return stepString;
}	

function IgoGame_DrawStep() //将棋谱绘制到指定对象中去
{
	var tmp_board = this.board
	
	eval(this.panel).step.value = this.currentStep;
	
	var lab = this.label;

	while(lab != null) //显示标记
	{
		if (lab.step == (this.currentStep - 0) + (this.startIndex - 0) || lab.step < (this.currentStep - 0) + (this.startIndex - 0) && (lab.pos.stone == 'W' || lab.pos.stone == 'B'))
		{
			if (lab.pos.stone == 'W' || lab.pos.stone == 'B')
			{
				tmp_board = this.putStone(lab.pos);
			}
			if (this.isShowLab)
			{
				this.board = this.putStone(lab.pos);
			}
		}
		lab = lab.next;
	}

	if (this.currentStep > 0 && !this.takeSelf)
	{
		this.board =this.applyStep(this.toStep((this.currentStep - 0) + (this.startIndex - 0)), IgoGame_NewBlackStone, IgoGame_NewWhiteStone);
	}

	eval(this.panel).board.value = this.board;
		
	var comm = this.comment;
	eval(this.panel).comment.value = "";
	
	while(comm != null)   //显示解说
	{
		if (comm.step == (this.currentStep - 0) + (this.startIndex - 0))
		{
			eval(this.panel).comment.value = comm.text;
		}
		comm = comm.next;
	}
	
	this.board = tmp_board;
}

function IgoGame_ApplyStep(stepStr, blackToken, whiteToken) //解析单步并绘制棋谱
{
	if (blackToken == null)
	{
		blackToken = IgoGame_BlackStone;
	}
	if (whiteToken == null)
	{
		whiteToken = IgoGame_WhiteStone;
	}

	if (stepStr != null)
	{
		var pos = IgoGame_getPosition(stepStr);
		return this.putStone(pos, blackToken, whiteToken); 
	}
	else
	{
		return this.board;
	}
}

function IgoGame_PutStone(pos, blackToken, whiteToken)  //落子
{
	if (blackToken == null)
	{
		blackToken = IgoGame_BlackStone;
	}
	if (whiteToken == null)
	{
		whiteToken = IgoGame_WhiteStone;
	}
	
	var idx = IgoGame_getIndexer(pos);
	
	if (pos.stone == "B")
	{
		return this.board.substring(0,idx) + blackToken + this.board.substring(idx+1, this.board.length);
	}
	else if (pos.stone == "W")
	{
		return this.board.substring(0,idx) + whiteToken + this.board.substring(idx+1, this.board.length);
	}
	else
	{
		return this.board.substring(0,idx) + pos.stone + this.board.substring(idx+1, this.board.length);
	}
}
function IgoGame_RemoveStep(stepStr) //撤销当前走子
{
	var pos = IgoGame_getPosition(stepStr);
	return this.removeStone(pos);
}
function IgoGame_RemoveStone(pos) //提起棋子
{
	var idx = IgoGame_getIndexer(pos);

	if (pos.stone == "B" || pos.stone == "W")
	{
		return this.board.substring(0,idx) + IgoGame_InitBoard().charAt(idx) + this.board.substring(idx+1, this.board.length);
	}
}

function IgoGame_getBoardStone(pos) //将当前位置的棋子设成和棋盘上的棋子颜色相同
{
	if(pos != null)
	{
		var idx = IgoGame_getIndexer(pos);
		var st = this.board.charAt(idx);
		pos.stone = IgoGame_toStone(st);
	}
	return pos;
}

function IgoGame_TestTake(pos) //提子判断
{
   var pos_above = this.getStone(pos.above());
   var pos_nether = this.getStone(pos.nether());
   var pos_left = this.getStone(pos.leftside());
   var pos_right = this.getStone(pos.rightside());
   var isTake = false;

	if (pos_above != null && pos_above.stone != null && pos_above.stone != pos.stone)
	{
		if (this.canTake(pos_above))
		{
			this.take(pos_above);
			isTake = true;
		}
	}
	if (pos_nether != null && pos_nether.stone != null && pos_nether.stone != pos.stone)
	{
		if (this.canTake(pos_nether))
		{
			this.take(pos_nether);
			isTake = true;
		}
	}
	if (pos_left != null && pos_left.stone != null && pos_left.stone != pos.stone)
	{
		if (this.canTake(pos_left))
		{
			this.take(pos_left);
			isTake = true;
		}
	}
	if (pos_right != null && pos_right.stone != null && pos_right.stone != pos.stone)
	{
		if (this.canTake(pos_right))
		{
			this.take(pos_right);
			isTake = true;
		}
	}
	if (this.canTake(pos))
	{
		this.takeSelf = true;
		this.take(pos);
		isTake = true;
	}
	return this.isTake;
}

function IgoGame_Take(pos) //提子
{
	var pos_left = this.getStone(pos.leftside());
	var pos_right = this.getStone(pos.rightside());
	var pos_above = this.getStone(pos.above());
	var pos_nether = this.getStone(pos.nether());
	
   this.board = this.removeStone(pos);
   if (this.stonesTake == null)
   {
	   this.stonesTake = new Label(this.currentStep, pos);
   }
   else
   {
	   this.stonesTake.append(new Label(this.currentStep, pos));
   }	

   if (pos_above != null && pos_above.stone == pos.stone)
   {
		this.take(pos_above);
   }
   if (pos_nether != null && pos_nether.stone == pos.stone)
   {
		this.take(pos_nether);
   }
   if (pos_left != null && pos_left.stone == pos.stone)
   {
		this.take(pos_left);
   }
   if (pos_right != null && pos_right.stone == pos.stone)
   {
		this.take(pos_right);
   }
}

function IgoGame_CanTake(pos)
{
	var canTake = true;
	var pos_left = this.getStone(pos.leftside());
	var pos_right = this.getStone(pos.rightside());
	var pos_above = this.getStone(pos.above());
	var pos_nether = this.getStone(pos.nether());
	
	if (pos_left != null && pos_left.stone == null
		|| pos_right != null && pos_right.stone == null
		|| pos_above != null && pos_above.stone == null
		|| pos_nether != null && pos_nether.stone == null)
	{
		return false;
	}

	if (canTake && pos_left != null && pos_left.stone == pos.stone)
	{
		this.board = this.putStone(pos.reverse());
		canTake = this.canTake(pos_left);
		this.board = this.putStone(pos.reverse());
	}

	if (canTake && pos_right != null && pos_right.stone == pos.stone)
	{
		this.board = this.putStone(pos.reverse());
		canTake = this.canTake(pos_right);
		this.board = this.putStone(pos.reverse());
	}

	if (canTake && pos_above != null && pos_above.stone == pos.stone)
	{
		this.board = this.putStone(pos.reverse());
		canTake = this.canTake(pos_above);
		this.board = this.putStone(pos.reverse());
	}

	if (canTake && pos_nether != null && pos_nether.stone == pos.stone)
	{
		this.board = this.putStone(pos.reverse());
		canTake = this.canTake(pos_nether);
		this.board = this.putStone(pos.reverse());
	}

	return canTake;
}

/***********************************************************************************************\
 *		Static Internal Functions ——  Please do not use them outside of this file              *
\***********************************************************************************************/

var IgoGame_BlackStone = "●";
var IgoGame_WhiteStone = "○";
var IgoGame_NewBlackStone = "◆";
var IgoGame_NewWhiteStone = "◇";
var IgoGame_None = null;

function IgoGame_InitBoard()
{
		var _board = "19 ┌┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┐\n"+
						 "18 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 "17 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 "16 ├┼┼╋┼┼┼┼┼╋┼┼┼┼┼╋┼┼┤\n"+
						 "15 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 "14 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 "13 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 "12 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 "11 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 "10 ├┼┼╋┼┼┼┼┼╋┼┼┼┼┼╋┼┼┤\n"+
						 " 9 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 " 8 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 " 7 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 " 6 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 " 5 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 " 4 ├┼┼╋┼┼┼┼┼╋┼┼┼┼┼╋┼┼┤\n"+
						 " 3 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 " 2 ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤\n"+
						 " 1 └┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┘\n"+
						 "    A B C D E F G H J K L M N O P Q R S T"; 
		return _board;
}

function IgoGame_toStone(chr) //将标记转换成相应的黑白子
{
	if (chr == IgoGame_BlackStone || chr == IgoGame_NewBlackStone)
	{
		return 'B';
	}
	else if (chr == IgoGame_WhiteStone || chr==IgoGame_NewWhiteStone)
	{
		return 'W';
	}
	else
	{
		return null;
	}
}

function IgoGame_isStone(chr) //判断当前标记是否是棋子
{
	if (chr == IgoGame_BlackStone || chr == IgoGame_WhiteStone || chr == IgoGame_NewBlackStone || chr == IgoGame_NewWhiteStone)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function IgoGame_getPosition(stepStr)  //将SGF指令转换为对应的棋盘状态
{
	var pos = new BoardPosition(-1, -1, IgoGame_None);

	var i = stepStr.indexOf('[');
	
	if (i != -1)
	{
		pos.stone  = stepStr.substring(0, i);
		pos.X = (stepStr.charCodeAt(i+1) - "a".charCodeAt(0));
		pos.Y = (stepStr.charCodeAt(i+2) - "a".charCodeAt(0));
	}
	return pos;
}

function IgoGame_getIndexer(pos) //从棋盘状态获得对应的棋盘字符串索引
{
	return 3 + pos.X + 23 * pos.Y;
}

/**********************************************************************************************\
 *  Class BoardPosition                                                                                                                                      *
\**********************************************************************************************/

function BoardPosition(x, y, st)
{
	this.X = x;
	this.Y = y;
	this.stone = st;
	this.above = BoardPosition_Above;
	this.nether = BoardPosition_Nether;
	this.leftside = BoardPosition_LeftSide;
	this.rightside = BoardPosition_RightSide;
	this.reverse = BoardPosition_Reverse;
}

var IgoGame_DefaultBoardSize = 19;

function BoardPosition_Reverse() //将棋子颜色取反
{
	if (this.stone == 'W')
	{
		this.stone = 'B';
	}
	else if (this.stone == 'B')
	{
		this.stone = 'W';
	}
	return this;
}

function BoardPosition_Above()   //获得上方相邻棋子的位置
{
	if (this.Y > 0)
	{
		return new BoardPosition(this.X, this.Y - 1);
	}
	return null;
}

function BoardPosition_Nether()  //获得下方相邻的棋子的位置
{
	if (this.Y < IgoGame_DefaultBoardSize - 1)
	{
		return new BoardPosition(this.X, this.Y + 1);
	}
	return null;
}

function BoardPosition_LeftSide() //获得左面相邻的棋子的位置
{
	if (this.X > 0)
	{
		return new BoardPosition(this.X - 1, this.Y);
	}
	return null;
}

function BoardPosition_RightSide() //获得右面相邻的棋子的位置
{
	if (this.X < IgoGame_DefaultBoardSize - 1)
	{
		return new BoardPosition(this.X + 1, this.Y);
	}
	return null;
}

/*****************************************************************************\
 *   Class Comment                                                           *
\*****************************************************************************/

function Comment(_step, _text)
{
	this.step = _step;
	this.text = _text;
	this.next = null;
	
	this.append = Comment_Append;
}

function Comment_Append(comm)
{
	var current = this;
	while (current.next != null)
	{
		current = current.next;
	}
	current.next = comm;
}

/*****************************************************************************\
 *   Class Label                                                             *
\*****************************************************************************/

function Label(_step, _pos)
{
	this.step = _step;
	this.pos = _pos;
	this.next = null;

	this.append = Label_Append;
}

function Label_Append(lab)
{
	var current = this;
	while (current.next != null)
	{
		current = current.next;
	}
	current.next = lab;
}

