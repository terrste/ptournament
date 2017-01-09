Points = new Mongo.Collection("points");
Plates = new Mongo.Collection("plates"); 
Tables = new Mongo.Collection("tables"); 

labels={
	app_title: "PAG Tournament"
};

hands=[
	{
		id: 0,
		name: "high card",
		img: "niente_punto.png",
		type: 'HI',
		value: 1
	},
	{
		id: 1,
		name: "one pair",
		img: "coppia.png",
		type: 'HI',
		value: 2
	},
	{
		id: 2,
		name: "two pair",
		img: "doppia_coppia.png",
		type: 'HI',
		value: 3
	},
	{
		id: 3,
		name: "three of a kind",
		img: "tris.png",
		type: 'HI',
		value: 4
	},
	{
		id: 4,
		name: "straight",
		img: "scala.png",
		type: 'HI',
		value: 5
	},
	{
		id: 5,
		name: "full house",
		img: "full.png",
		type: 'HI',
		value: 6
	},
	{
		id: 6,
		name: "flush",
		img: "colore.png",
		type: 'CO',
		value: 7
	},
	{
		id: 7,
		name: "four of a kind",
		img: "poker.png",
		type: 'HI',
		value: 8
	},
	{
		id: 8,
		name: "straight flush",
		img: "scala_reale.png",
		type: 'CO-HI',
		value: 9
	},
	{
		id: 9,
		name: "non visto",
		img: "non_visto.png",
		type: 'NV',
		value: 0
	}
];