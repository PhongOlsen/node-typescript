import * as _ from 'lodash';

export const getValue = (obj: any, defaultValue: any, ...args: any) => args.reduce((obj1: any, level: any) => obj1 && obj1[level], obj) || defaultValue;

export const isDeepEqual = (obj1: any, obj2: any) => _.isEqual(obj1, obj2);