// Global Imports
import * as React from 'react';
import { generateAlphabet, getFilteredData, getIndex, trCompare } from '../src/Helpers/index';

describe('Helper', () => {
	describe('getIndex', () => {
		it('should return index of item list with autosort', () => {
			const alphabets = 'F';

			const items = [
				{
					Id: 1,
					Name: 'Foo',
					Value: 'Foo',
					key: 'Foo'
				},
				{
					Id: 2,
					Name: 'BarFoo',
					Value: 'BarFoo',
					key: 'BarFoo'
				}
			]

			const autoSort = true;
			const searchText = 'Foo';

			expect(getIndex(alphabets, items, autoSort, searchText)).toEqual(1);
		});
		it('should return index of item list without autosort', () => {
			const alphabets = 'F';

			const items = [
				{
					Id: 1,
					Name: 'Foo',
					Value: 'Foo',
					key: 'Foo'
				},
				{
					Id: 2,
					Name: 'BarFoo',
					Value: 'BarFoo',
					key: 'BarFoo'
				}
			]

			const autoSort = false;
			const searchText = 'Foo';

			expect(getIndex(alphabets, items, autoSort, searchText)).toEqual(0);
		});
	});

	describe('getFilteredData', () => {
		it('should return filtered data without autosort', () => {
			const items = [
				{
					Id: 1,
					Name: 'Foo',
					Value: 'Foo',
					key: 'Foo'
				},
				{
					Id: 2,
					Name: 'BarFoo',
					Value: 'BarFoo',
					key: 'BarFoo'
				}
			]

			const autoSort = false;
			const searchText = 'Foo';

			expect(getFilteredData(items, autoSort, searchText)).toEqual(items);
		});
		it('should return filtered data with autosort', () => {
			const items = [
				{
					Id: 2,
					Name: 'BarFoo',
					Value: 'BarFoo',
					key: 'BarFoo'
				},
				{
					Id: 1,
					Name: 'Foo',
					Value: 'Foo',
					key: 'Foo'
				}

			]

			const autoSort = true;
			const searchText = 'Foo';

			expect(getFilteredData(items, autoSort, searchText)).toEqual(items);
		});
	});

	describe('generateAlphabet', () => {
		it(' should return Alphabet with sorting language', () => {
			const items = [
				{
					Id: 1,
					Name: 'Foo',
					Value: 'Foo',
					key: 'Foo'
				},
				{
					Id: 2,
					Name: 'BarFoo',
					Value: 'BarFoo',
					key: 'BarFoo'
				}
			];

			expect(generateAlphabet(items)).toEqual(['B', 'F']);
		});

		it('should return Alphabet without sorting language with TR', () => {
			const items = [
				{
					Id: 1,
					Name: 'Öoo',
					Value: 'Öoo',
					key: 'Öoo'
				},
				{
					Id: 2,
					Name: 'Çar',
					Value: 'Çar',
					key: 'Çar'
				}
			];

			const sortingLanguage = 'tr';
			expect(generateAlphabet(items, sortingLanguage)).toEqual(['Ç', 'Ö']);
		});

		it('should compare turkish letter', () => {
			const a = 'ö'
			const b = 'o';

			expect(trCompare(a, b)).toEqual(2);
			expect(trCompare(b, a)).toEqual(-2);
		});

		it('should compare empty string', () => {
			const a = ''
			const b = '';

			expect(trCompare(a, b)).toEqual(0);
		});

		it('should compare empty string', () => {
			const a = 'a'
			const b = 'a';

			expect(trCompare(a, b)).toEqual(0);
		});
	})
});
