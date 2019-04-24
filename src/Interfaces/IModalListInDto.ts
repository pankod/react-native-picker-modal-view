
export interface IModalListInDto<T = object> {
	Id: string | number;
	Name: string;
	Value: string | T;
	[key: string]: any;
	CountryId?: ICity;
	CityId?: ITown;
}

interface ICity {
	CountryId: string | number;
}

interface ITown {
	CityId?: string | number;
}
