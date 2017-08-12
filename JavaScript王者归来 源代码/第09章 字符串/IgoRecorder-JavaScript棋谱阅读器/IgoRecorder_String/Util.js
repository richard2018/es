/**************************************************************************\
 *   IgoElf Javascript Parser Ver 1.00                                    *
 *   Author akira_cn@msn.com                                              *   
 *   Copyright (c) 2004 all rights reserved                               *
\**************************************************************************/

self.resizeTo(600, 560);
self.moveTo(200,100);

var StatusText1 = "IgoElf V1.03 实战棋谱";
var StatusText2 = "点击可试走，鼠标移出棋盘时结束试走";
var StatusText = StatusText1;
self.defaultStatus = StatusText;

	
var IgoGame = new IgoGame(gameRecords, 'window', gameStartIndex);

function Reload()
{
	IgoGame.setComment(gameComments);
	IgoGame.setLabel(gameLabels);
	IgoGame.goStep(0);
}

function TryStep() //试走
{
	var space = 16;
	var x = event.clientX;
	var y = event.clientY;
	var top = 56 - space / 2;
	var left = 85 - space / 2;
	var i = 0;
	var j = 0;

	for (i = 0; left + i * space < x; i++);
	for (j = 0; top + j * space < y; j++);
				
	if (i <= 0 || j <= 0 || i > 19 || j > 19)
	{
		return;
	}

	var tryPos = new BoardPosition(i-1,j-1);

	if (IgoGame.getStone(tryPos).stone != null)
	{
		IgoGame.board = IgoGame.removeStone(tryPos);
	}

	else
	{
		tryPos.stone = currentStone;

		IgoGame.board = IgoGame.putStone(tryPos);
		IgoGame.testTake(tryPos);

		currentStone = tryPos.reverse().stone;
	}
	IgoGame.draw();
}

var currentStone = 'B';   //试走棋子颜色

function InitTry()  //初始化试走
{
	IgoGame.isShowLab = false;
	IgoGame.goStep(window.step.value);
	StatusText = StatusText2;
	self.status = StatusText;
	if (IgoGame.currentStep == 0)
	{
		currentStone = 'B';
	}
	else
	{
		currentStone = IgoGame_getPosition(IgoGame.toStep(IgoGame.currentStep)).reverse().stone;
	}
}

function DisposeTry() //结束试走
{
	IgoGame.isShowLab = true;
	IgoGame.goStep(window.step.value);
	StatusText = StatusText1;
}