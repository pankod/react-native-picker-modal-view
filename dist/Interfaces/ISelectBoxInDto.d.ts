/// <reference types="react" />
import { IModalListInDto } from './';
declare type ListType = IModalListInDto[];
export interface ISelectBoxProps {
    selectedObject?: IModalListInDto;
    openModal: () => void;
    chooseText: string;
    disabled?: boolean;
    renderSelectView?: (disabled: boolean, selected: IModalListInDto, showModal: () => void) => React.ReactElement;
    items: ListType;
}
export {};
