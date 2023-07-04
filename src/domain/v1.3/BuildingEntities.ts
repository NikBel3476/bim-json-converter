export interface BuildingJson {
		fileData: FileData;
		buildingData: BuildingData;
}

export interface FileData {
	version: string;
	formatVersion: number;
	dateOfCreation: string;
	usedProgram: ProgramInformation
}

export interface ProgramInformation {
	name: string;
	version: string;
}

export interface BuildingData {
	name: string;
	levels: Level[];
	address: Address;
}

export interface Address {
	city: string;
	streetAddress: string;
	additionalInfo: string;
}

export interface Level {
	name: string;
	zLevel: number;
	elements: Array<BuildingElement>;
}

export interface BuildingElement {
	id: string;
	name: string;
	outputs: string[];
	sizeZ: number;
	points: Point[];
	sign: Sign;
	type: number;
}

export interface Point {
	x: number;
	y: number;
}

export enum Sign {
	ROOM = "room",
	STAIRCASE = "staircase",
	DOOR_WAY = "doorWay",
	DOOR_WAY_INT = "doorWayInt",
	DOOR_WAY_OUT = "doorWayOut"
}
