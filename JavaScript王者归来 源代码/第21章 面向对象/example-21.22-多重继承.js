Function.prototype.extends = function(obj)
{
	for(var each in obj)
	{
		this.prototype[each] = obj[each];
	}
}
function Transportation()
{
	//����
}
function Motorcar()
{
	//����
}
//Motorcar�̳�Transportation
Motorcar.extands(new Transportation());
function Ship()
{
	//����
}
//Ship�̳�Transportation
Ship.extands(new Transportation ());
function TwoRoosts()
{
	//����
}
TwoRoots.extends(new Motorcar());
TwoRoots.extends(new Ship());	//TwoRootsͬʱ�̳�Motorcar��Ship
