export interface Building {
	NameBuilding: string;
	Level: Array<Level>;
	Address: Address;
	Devs: string[];
}

export interface Address {
	City: string;
	StreetAddress: string;
	AddInfo: string;
}

export interface Level {
	NameLevel: string;
	ZLevel: number;
	BuildElement: Array<BuildingElement>;
}

export interface BuildingElement {
	'@': string;
	Name: string;
	SizeZ: number;
	Sign: string;
	XY: Array<BuildingElementPoints>;
	Output: Array<string>;
	Id: string;
}

export interface BuildingElementPoints {
	points: Array<Point>;
}

export interface Point {
	x: number;
	y: number;
}
