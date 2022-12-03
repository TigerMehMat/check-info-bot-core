import _ from 'lodash';
import { IEqualFunction } from '../types.js';

export const equalObjects: IEqualFunction = _.isEqual;
