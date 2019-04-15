// Local Imports
import { IModalListInDto } from '@Interfaces';

export interface IListItemInDto {
	list: IModalListInDto;
	onChangeMethod: (obj: IModalListInDto) => IModalListInDto;
}
