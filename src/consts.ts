import { V1_0ToV1_1 } from './converter/V1.0ToV1.1.ts';
import { V1_1ToV1_3 } from './converter/V1.1ToV1.3.ts';

export type ConversionMappingKeys = keyof typeof SUPPORTED_CONVERSIONS_MAPPING;
export const SUPPORTED_CONVERSIONS_MAPPING = {
	'1.0 to 1.1': V1_0ToV1_1,
	'1.1 to 1.3': V1_1ToV1_3
};
