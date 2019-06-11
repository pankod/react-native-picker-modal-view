import { IModalListInDto } from '@Interfaces';

export const generateAlphabet = (items: IModalListInDto[], sortingLanguage?: string): Array<string> => {
	const singularAlpha = [];
	items.map((x: IModalListInDto) => {
		if (singularAlpha.indexOf(x.Name.charAt(0)) === -1) {
			singularAlpha.push(x.Name.charAt(0));
		}
	});

	if (sortingLanguage === 'tr') {
		return singularAlpha.sort((a, b) => trCompare(a, b));
	} else {
		return singularAlpha.sort((a, b) => a.localeCompare(b));
	}
}

// source https://gist.github.com/ugurozpinar/9682734
export const trCompare = (a: any, b: any): number => {
	const alphabets = 'AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz0123456789';
	if (a.length === 0 || b.length === 0) {
		return a.length - b.length;
	}
	for (let i = 0; i < a.length && i < b.length; i++) {
		const ai = alphabets.indexOf(a[i]);
		const bi = alphabets.indexOf(b[i]);
		if (ai !== bi) {
			return ai - bi;
		}
	}

	return 0;
}

export const getIndex = (alphabet: string, items: IModalListInDto[], autoSort: boolean, searchText: string): number => {
	const list = getFilteredData(items, autoSort, searchText);


	const findIndex = list.findIndex((x: IModalListInDto) => {
		return x.Name.charAt(0) === alphabet;
	});

	return findIndex;
}

export const getFilteredData = (items: IModalListInDto[], autoSort: boolean, searchText: string): IModalListInDto[] => {
	if (autoSort) {
		items.sort((a, b) => trCompare(a.Name, b.Name));
	}
	return items.filter((l: IModalListInDto) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
}
