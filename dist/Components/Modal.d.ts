import * as React from 'react';
import { IModalInDto } from '../Interfaces';
export declare class ModalComponent extends React.Component<IModalInDto, {}> {
    static defaultProps: {
        animationType: string;
        closeable: boolean;
        hideAlphabetFilter: boolean;
    };
    render(): JSX.Element;
    private onChangeMethod;
}
