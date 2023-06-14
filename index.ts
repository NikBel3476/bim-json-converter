import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { Building } from './domain/v1.1/BuildingEntities';

const jsonFilesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'json');
const jsonFilesPathIn = path.join(jsonFilesPath, 'in');
const jsonFilesPathOut = path.join(jsonFilesPath, 'out');

const filenames = await fs.readdir(jsonFilesPathIn, { encoding: 'utf-8' });

await convertFromV1_0ToV1_1(filenames);

async function convertFromV1_0ToV1_1(filenames: string[]) {
	for (const filename of filenames) {
		const jsonFileV1_0 = JSON.parse(
			(await fs.readFile(path.join(jsonFilesPathIn, filename))).toString()
		);

		try {
			const building: Building = {
				Devs: [],
				NameBuilding: jsonFileV1_0.NameBuilding,
				Address: {
					City: jsonFileV1_0.Address.City,
					StreetAddress: jsonFileV1_0.Address.StreetAddress,
					AddInfo: jsonFileV1_0.Address.AddInfo
				},
				Level: jsonFileV1_0.Level.map((level: any) => ({
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

			const outFilename = path.join(jsonFilesPathOut, filename);
			const outFile = await fs.open(outFilename, 'w+');

			await outFile.writeFile(JSON.stringify(building, null, 4));
			await outFile.close();
		} catch (e) {
			console.log('Something went wrong');
			console.log(e);
		}
	}
}
