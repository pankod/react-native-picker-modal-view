import { IModalListInDto } from '@Interfaces';
import { ViewStyle } from 'react-native';

export interface ISelectBoxProps {
	selectedObject?: IModalListInDto;
	openModal: any;
	chooseText: string;
	disabled?: boolean;
}
