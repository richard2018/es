Function.prototype.extends = function(obj)
{
	for(var each in obj)
	{
		this.prototype[each] = obj[each];
	}
}
function Transportation()
{
	//¡­¡­
}
function Motorcar()
{
	//¡­¡­
}
//Motorcar¼Ì³ÐTransportation
Motorcar.extands(new Transportation());
function Ship()
{
	//¡­¡­
}
//Ship¼Ì³ÐTransportation
Ship.extands(new Transportation ());
function TwoRoosts()
{
	//¡­¡­
}
TwoRoots.extends(new Motorcar());
TwoRoots.extends(new Ship());	//TwoRootsÍ¬Ê±¼Ì³ÐMotorcarºÍShip
