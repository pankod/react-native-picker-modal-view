// Local Imports
import { AnimationTypeEnum } from '@Enum';
import { IModalListInDto } from '@Interfaces';

export interface IModalInDto {
	animationType: AnimationTypeEnum;
	hideAlphabetFilter: boolean;
	onRequestClosed: () => void;
	onChange: (selected: IModalListInDto) => IModalListInDto;
	closeable: boolean;
	list: IModalListInDto[];
}
