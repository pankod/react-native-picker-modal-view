import { IModalListInDto } from '../Interfaces';
export declare const generateAlphabet: (items: IModalListInDto<object>[], sortingLanguage?: string) => string[];
export declare const trCompare: (a: any, b: any) => number;
export declare const getIndex: (alphabet: string, items: IModalListInDto<object>[], autoSort: boolean, searchText: string) => number;
export declare const getFilteredData: (items: IModalListInDto<object>[], autoSort: boolean, searchText: string) => IModalListInDto<object>[];
