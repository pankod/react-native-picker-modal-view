import { AnimationTypeEnum } from '../Enum';
import { IModalListInDto } from './';
export interface IModalInDto {
    animationType: AnimationTypeEnum;
    hideAlphabetFilter: boolean;
    onRequestClosed: () => void;
    onChange: (selected: IModalListInDto) => IModalListInDto;
    closeable: boolean;
    list: IModalListInDto[];
}
