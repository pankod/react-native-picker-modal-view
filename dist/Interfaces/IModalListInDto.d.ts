export interface IModalListInDto {
    Id: string | number;
    Name: string;
    Value: string;
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
export {};
