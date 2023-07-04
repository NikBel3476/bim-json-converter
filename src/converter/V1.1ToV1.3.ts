import { Building as BuildingJsonV1_1 } from '../domain/v1.1/BuildingEntities';
import {
	BuildingElement,
	BuildingJson as BuildingJsonV1_3,
	Level,
	Sign
} from '../domain/v1.3/BuildingEntities';

export const V1_1ToV1_3 = (bimJsonV1_1: BuildingJsonV1_1) => {
	try {
		const building: BuildingJsonV1_3 = {
			fileData: {
				dateOfCreation: new Date().toISOString(),
				formatVersion: Number(
					new Date().toISOString().substring(0, 10).split('-').join('')
				),
				usedProgram: {
					name: '',
					version: ''
				},
				version: '1.3'
			},
			buildingData: {
				name: bimJsonV1_1.NameBuilding,
				address: {
					city: bimJsonV1_1.Address.City,
					streetAddress: bimJsonV1_1.Address.StreetAddress,
					additionalInfo: bimJsonV1_1.Address.AddInfo
				},
				levels: bimJsonV1_1.Level.map<Level>(level => ({
					name: level.NameLevel,
					zLevel: level.ZLevel,
					elements: level.BuildElement.map<BuildingElement>(buildElement => ({
						id: buildElement.Id,
						name: buildElement.Name,
						sizeZ: buildElement.SizeZ,
						sign: buildElement.Sign as Sign,
						outputs: buildElement.Output,
						points: buildElement.XY[0].points,
						type: 0
					}))
				}))
			}
		};

		return building;
	} catch (e) {
		console.log('Something went wrong');
		console.log(e);
	}
};
