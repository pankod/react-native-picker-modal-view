import * as React from 'react';
import { IModalInDtoProps, IModalInDtoState } from '../Interfaces';
export declare class ModalComponent extends React.Component<IModalInDtoProps, IModalInDtoState> {
    private flatListRef;
    state: IModalInDtoState;
    static defaultProps: {
        animationType: string;
        closeable: boolean;
        hideAlphabetFilter: boolean;
        placeholderTextColor: string;
        modalVisible: boolean;
        autoGenerateAlphabet: boolean;
        sortingLanguage: string;
        removeClippedSubviews: boolean;
        chooseText: string;
        searchText: string;
        autoCorrect: boolean;
    };
    constructor(props: IModalInDtoProps);
    componentWillUnmount(): void;
    private clearComponent;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any, nextState: any): void;
    private openModal;
    render(): JSX.Element;
    private _onViewableItemsChanged;
    private onClose;
    private scrollToUp;
    private onScrolling;
    private renderItem;
    private generateAlphabet;
    private _keyExtractor;
    private setText;
    private getFilteredData;
    private onSelectMethod;
    private getIndex;
    private setAlphabet;
}
