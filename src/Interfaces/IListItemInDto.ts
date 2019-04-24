// Local Imports
import { IModalListInDto } from '@Interfaces';

export interface IListItemInDto {
	list: IModalListInDto;
	onSelectMethod: (obj: IModalListInDto) => IModalListInDto;
	defaultSelected?: IModalListInDto;
}
