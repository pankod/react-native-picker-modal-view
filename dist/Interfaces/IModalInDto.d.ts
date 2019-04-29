import { FlatListProps, TextInputProps, ModalBaseProps, ModalPropsIOS, ModalPropsAndroid } from 'react-native';
import { AnimationTypeEnum, LanguagesEnum } from '../Enum';
import { IModalListInDto } from './';
declare type ModalProps = ModalBaseProps | ModalPropsIOS | ModalPropsAndroid;
declare type ListType = IModalListInDto[];
export interface IModalInDtoProps {
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
    sortingLanguage?: LanguagesEnum;
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
}
export interface IModalInDtoState {
    modalVisible: boolean;
    searchText: string;
    alphabeticalIndexChars?: string[];
    stickyBottomButton?: boolean;
    selectedAlpha?: string;
    selectedObject?: IModalListInDto;
}
export {};
