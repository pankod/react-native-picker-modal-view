// Global Imports
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Local Imports
import { ISelectBoxProps } from '@Interfaces';

export class SelectBoxComponent extends React.PureComponent<ISelectBoxProps, {}> {
	public render(): JSX.Element {
		const { openModal } = this.props;
		return (
			<TouchableOpacity activeOpacity={0.7} onPress={() => openModal()}>
				<Text>Seçiniz</Text>
			</TouchableOpacity>
		);
	}
}
