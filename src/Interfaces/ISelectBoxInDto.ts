import { IModalListInDto } from '@Interfaces';
import { ViewStyle } from 'react-native';

export interface ISelectBoxProps {
	selectedObject?: IModalListInDto;
	openModal: () => void;
	chooseText: string;
	disabled?: boolean;
}
