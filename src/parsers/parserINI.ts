import * as ini from 'ini';
import { IWatchParserFunction } from '../types.js';

export const parserINI: IWatchParserFunction = (input) => ini.parse(input);
