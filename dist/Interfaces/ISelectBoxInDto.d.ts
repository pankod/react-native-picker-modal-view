import { IModalListInDto } from './';
export interface ISelectBoxProps {
    selectedObject?: IModalListInDto;
    openModal: () => void;
    chooseText: string;
    disabled?: boolean;
}
