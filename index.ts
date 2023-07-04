import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { V1_1ToV1_3 } from './src/converter/V1.1ToV1.3';

const jsonFilesPath = path.join(__dirname, 'json');
const jsonFilesPathIn = path.join(jsonFilesPath, 'in');
const jsonFilesPathOut = path.join(jsonFilesPath, 'out');

(async function () {
	const filenames = (await fs.readdir(jsonFilesPathIn, { encoding: 'utf-8' })).filter(
		filename => filename.endsWith('.json')
	);

	for (const filename of filenames) {
		const jsonFileV1_1 = JSON.parse(
			(await fs.readFile(path.join(jsonFilesPathIn, filename))).toString()
		);

		const building = V1_1ToV1_3(jsonFileV1_1);

		const outFilename = path.join(jsonFilesPathOut, 'v1.3', filename);
		const outFile = await fs.open(outFilename, 'w+');

		await outFile.writeFile(JSON.stringify(building, null, 4));
		await outFile.close();
	}
})();
