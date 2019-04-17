// Global Imports
import {
	FlatListProps,
	TextInputProps,
	ViewStyle,
	ModalBaseProps,
	ModalPropsIOS,
	ModalPropsAndroid,
} from 'react-native';

// Local Imports
import { AnimationTypeEnum, LanguagesEnum } from '@Enum';
import { IModalListInDto } from '@Interfaces';

type ModalProps = ModalBaseProps | ModalPropsIOS | ModalPropsAndroid;

type ListType = IModalListInDto[];

export interface IModalInDtoProps {
	animationType: AnimationTypeEnum;
	hideAlphabetFilter: boolean;
	onRequestClosed: () => void;
	onBackRequest?: () => void;
	onSelected: (selected: IModalListInDto) => IModalListInDto;
	closeable: boolean;
	list: ListType;
	alphaBets?: string[];
	placeholderTextColor?: string;
	keyExtractor?: (key: any) => string;
	autoGenerateAlphabet?: boolean;
	sortingLanguage?: LanguagesEnum;
	showToTopButton?: boolean;
	onEndReached: () => void;
	removeClippedSubviews: boolean;
	FlatListProps: FlatListProps<any>;
	chooseText: string;
	defaultSelected?: IModalListInDto;
	searchText: string;
	autoCorrect: boolean;
	SearchInputProps?: TextInputProps;
	ModalProps?: ModalProps;
	autoSort?: boolean;
	style?: ViewStyle;
	disabled: boolean;
}

export interface IModalInDtoState {
	modalVisible: boolean;
	searchText: string;
	alphaBets?: string[];
	stickyBottomButton?: boolean;
	selectedAlpha?: string;
	selectedObject?: IModalListInDto;
}
