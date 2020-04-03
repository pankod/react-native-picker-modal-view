// Global Imports
import {
	FlatListProps,
	TextInputProps,
	ModalBaseProps,
	ModalPropsIOS,
	ModalPropsAndroid,
} from 'react-native';

// Local Imports
import { AnimationTypeEnum } from '@Enum';
import { IModalListInDto } from '@Interfaces';

type ModalProps = ModalBaseProps | ModalPropsIOS | ModalPropsAndroid;

type ListType = IModalListInDto[];

export interface IModalProps {
	modalAnimationType?: AnimationTypeEnum;
	showAlphabeticalIndex: boolean;
	onClosed: () => void;
	onBackButtonPressed?: () => void;
	onSelected: (selected: IModalListInDto) => IModalListInDto;
	items: ListType;
	alphabeticalIndexChars?: string[];
	searchInputTextColor?: string;
	keyExtractor?: (key: any, index: number) => string;
	autoGenerateAlphabeticalIndex?: boolean;
	sortingLanguage?: string;
	showToTopButton?: boolean;
	onEndReached: () => void;
	removeClippedSubviews: boolean;
	FlatListProps?: FlatListProps<any>;
	selectPlaceholderText: string;
	selected?: IModalListInDto;
	searchPlaceholderText: string;
	SearchInputProps?: TextInputProps;
	ModalProps?: ModalProps;
	autoSort?: boolean;
	disabled: boolean;
	requireSelection: boolean;
	renderListItem?: (selectedItem: IModalListInDto, listItem: IModalListInDto) => JSX.Element
	renderSelectView?: (disabled: boolean, selected: IModalListInDto, showModal: () => void) => React.ReactElement
	backButtonDisabled?: boolean,
	renderSearch?: (onClose: () => void, onBack: () => void ) =>  JSX.Element,
}

export interface IModalState {
	modalVisible: boolean;
	searchText: string;
	alphabeticalIndexChars?: string[];
	stickyBottomButton?: boolean;
	selectedAlpha?: string;
	selectedObject?: IModalListInDto;
}
