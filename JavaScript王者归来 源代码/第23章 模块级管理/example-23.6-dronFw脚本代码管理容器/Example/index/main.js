/*******************************************\
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
$("showClassList").innerHTML = (function ()
{
	var gt = new DronFw.Class.GridTable;
	gt.Widths = [40, 80, 80, 200, 120, 50];
	gt.Titles = ["���", "������", "����", "˵��", "���л���", "����"];
	gt.Aligns = ["center", "center", "center", "left", "left", "center"];
	for (var i=0; i<cls.count; i++)
	{
		cls.go(i);
		var t = cls.read("Example") ? ("<a href=\""+ cls.read("Example") +"\" target=\"_blank\">����</a>") :
			"��������";
		gt.AddItem([i+1,cls.read("Name"),cls.read("Worker"),cls.read("Description"),cls.read("Navigator"),t]);
	};
	return gt.CreateTable();
})();

$("showPrototypeList").innerHTML = (function ()
{
	var gt = new DronFw.Class.GridTable;
	gt.Widths = [40, 80, 80, 200, 120, 50];
	gt.Titles = ["���", "��������", "����", "˵��", "���л���", "����"];
	gt.Aligns = ["center", "center", "center", "left", "left", "center"];
	for (var i=0; i<pros.count; i++)
	{
		pros.go(i);
		var t = pros.read("Example") ? ("<a href=\""+ pros.read("Example") +"\" target=\"_blank\">����</a>") :
			"��������";
		gt.AddItem([i+1,pros.read("Name"),pros.read("Worker"),pros.read("Description"),pros.read("Navigator"),t]);
	};
	return gt.CreateTable();
})();

