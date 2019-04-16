import { IModalListInDto } from './';
export interface IListItemInDto {
    list: IModalListInDto;
    onSelectMethod: (obj: IModalListInDto) => IModalListInDto;
    defaultSelected?: IModalListInDto;
}
