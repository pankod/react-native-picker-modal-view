// Global Imports
import { FlatListProps, TextInputProps, ViewStyle } from 'react-native';

// Local Imports
import { AnimationTypeEnum, LanguagesEnum } from '@Enum';
import { IModalListInDto } from '@Interfaces';

export interface IModalInDtoProps {
	animationType: AnimationTypeEnum;
	hideAlphabetFilter: boolean;
	onRequestClosed: () => void;
	onSelected: (selected: IModalListInDto) => IModalListInDto;
	closeable: boolean;
	list: IModalListInDto[];
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
	autoSort?: boolean;
	style?: ViewStyle;
}

export interface IModalInDtoState {
	modalVisible: boolean;
	searchText: string;
	alphaBets?: string[];
	stickyBottomButton?: boolean;
	selectedAlpha?: string;
	selectedObject?: IModalListInDto;
}
