import {Building} from "../domain/v1.1/BuildingEntities";

async function V1_0ToV1_1(bimJsonV1_0: any) {
		try {
			const building: Building = {
				Devs: [],
				NameBuilding: bimJsonV1_0.NameBuilding,
				Address: {
					City: bimJsonV1_0.Address.City,
					StreetAddress: bimJsonV1_0.Address.StreetAddress,
					AddInfo: bimJsonV1_0.Address.AddInfo
				},
				Level: bimJsonV1_0.Level.map((level: any) => ({
					NameLevel: level.NameLevel,
					ZLevel: level.ZLevel,
					BuildElement: level.BuildElement.map((buildElement: any) => ({
						'@': buildElement.Id.substring(1, buildElement.Id.length - 1),
						Name: buildElement.Name,
						SizeZ: buildElement.SizeZ,
						Sign: buildElement.Sign,
						Output: buildElement.Output.map((output: any) =>
							output.substring(1, output.length - 1)
						),
						XY: buildElement.XY.map((xy: any) => ({
							points: xy.map((point: any) => ({
								x: point[0],
								y: point[1]
							}))
						})),
						Id: buildElement.Id.substring(1, buildElement.Id.length - 1)
					}))
				}))
			};

			return building;
		} catch (e) {
			console.log('Something went wrong');
			console.log(e);
		}
	}
