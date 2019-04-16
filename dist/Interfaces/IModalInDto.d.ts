import { FlatListProps } from 'react-native';
import { AnimationTypeEnum, LanguagesEnum } from '../Enum';
import { IModalListInDto } from './';
export interface IModalInDtoProps {
    animationType: AnimationTypeEnum;
    hideAlphabetFilter: boolean;
    onRequestClosed: () => void;
    onSelected: (selected: IModalListInDto) => IModalListInDto;
    closeable: boolean;
    list: IModalListInDto[];
    alphaBets?: string[];
    placeholderTextColor?: string;
    modalVisible: boolean;
    keyExtractor?: (key: any) => string;
    autoGenerateAlphabet?: boolean;
    sortingLanguage?: LanguagesEnum;
    showToTopButton?: boolean;
    onEndReached: () => void;
    removeClippedSubviews: boolean;
    flatListProps: FlatListProps<any>;
}
export interface IModalInDtoState {
    modalVisible: boolean;
    searchText: string;
    alphaBets?: string[];
    stickyBottomButton?: boolean;
    selectedAlpha?: string;
    selectedObject?: IModalListInDto;
}
