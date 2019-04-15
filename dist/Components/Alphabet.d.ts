import * as React from 'react';
import { IAlphabetsInDto } from '../Interfaces';
export declare class AlphabetComponent extends React.PureComponent<IAlphabetsInDto, {}> {
    static defaultProps: {
        alphaBets: string[];
    };
    render(): JSX.Element;
}
