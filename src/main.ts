import './style.css';
import { ConversionMappingKeys, SUPPORTED_CONVERSIONS_MAPPING } from './consts.ts';

let selectedConversion: ConversionMappingKeys;

const versionSelect = document.getElementById('version_select') as HTMLSelectElement;
const fileInput = document.getElementById('file_input') as HTMLInputElement;
const convertButton = document.getElementById('convert_button') as HTMLButtonElement;
const downloadSection = document.getElementById('download_section') as HTMLElement;
const errorsSection = document.getElementById('errors_section') as HTMLElement;

// options setup
versionSelect.addEventListener('change', onVersionSelectChange);
convertButton.addEventListener('click', onConvertButtonClick);

const supportedConversions: Array<ConversionMappingKeys> = Object.keys(
	SUPPORTED_CONVERSIONS_MAPPING
) as Array<ConversionMappingKeys>;
const options = supportedConversions.map(supportedConversion => {
	const option = document.createElement('option');
	option.value = supportedConversion;
	option.innerText = supportedConversion;
	return option;
});
versionSelect.append(...options);
selectedConversion = supportedConversions[0];

function onVersionSelectChange(event: Event) {
	const target = event.currentTarget as HTMLSelectElement | null;
	if (target) {
		selectedConversion = target.value as ConversionMappingKeys;
	}
}

async function onConvertButtonClick() {
	await convertBimJson();
}

function addFilesToDownload(files: File[]) {
	const downloadLinks = files.map(file => {
		const link = document.createElement('a');
		link.innerText = file.name;
		link.download = file.name;
		link.href = window.URL.createObjectURL(file);
		link.className = 'converted_file_link';
		return link;
	});

	downloadSection.innerHTML = '';
	const title = document.createElement('h2');

	title.innerText = 'Преобразованные файлы:';
	downloadSection.appendChild(title);
	downloadSection.append(...downloadLinks);
}

function showErrors(errorMessages: string[]) {
	const errorElements = errorMessages.map(errorMessage => {
		const errorElement = document.createElement('p');
		errorElement.innerText = errorMessage;
		errorElement.className = 'error_message';
		return errorElement;
	});

	const title = document.createElement('h2');
	title.innerText = 'Ошибки:';

	errorsSection.innerHTML = '';
	errorsSection.appendChild(title);
	errorsSection.append(...errorElements);
}

async function convertBimJson() {
	if (fileInput.files) {
		const conversionErrorMessages = [];
		const convertedFiles: File[] = [];
		const convertingFunction = SUPPORTED_CONVERSIONS_MAPPING[selectedConversion];
		for (const file of fileInput.files) {
			try {
				const json = JSON.parse(await file.text());
				const convertedBim = convertingFunction(json);
				convertedFiles.push(
					new File([JSON.stringify(convertedBim, undefined, 2)], file.name, {
						type: 'application/json'
					})
				);
			} catch (e) {
				conversionErrorMessages.push(`${file.name} - не удалось преобразовать файл`);
			}
		}

		addFilesToDownload(convertedFiles);
		if (conversionErrorMessages.length > 0) {
			showErrors(conversionErrorMessages);
		}
	}
}
