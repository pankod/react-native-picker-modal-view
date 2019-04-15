import { IModalListInDto } from './';
export interface IListItemInDto {
    list: IModalListInDto;
    onChangeMethod: (obj: IModalListInDto) => IModalListInDto;
}
