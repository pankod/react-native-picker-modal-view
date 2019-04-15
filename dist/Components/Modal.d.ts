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
    };
    constructor(props: IModalInDtoProps);
    componentWillMount(): void;
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
    private onChangeMethod;
    private getIndex;
    private setAlphabet;
}
