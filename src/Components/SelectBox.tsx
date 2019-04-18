// Global Imports
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// Local Imports
import { ISelectBoxProps } from '@Interfaces';
import { SelectBoxStyle } from '@Styles';

export class SelectBoxComponent extends React.PureComponent<ISelectBoxProps, {}> {
	public render(): JSX.Element {
		const { openModal, selectedObject, chooseText, disabled } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => openModal()}
				style={[SelectBoxStyle.pressBtn, disabled && SelectBoxStyle.disabledBtn]}
			>
				<View style={SelectBoxStyle.container}>
					<Text style={[disabled ? SelectBoxStyle.disabledTxt : SelectBoxStyle.chooseText]}>{
						(selectedObject && selectedObject.Name) ? selectedObject.Name : chooseText
					}</Text>
					<Image source={require('../Assets/Images/down.png')}
						style={[SelectBoxStyle.downBtn, disabled && SelectBoxStyle.disabledImage]}
					/>
				</View>
			</TouchableOpacity>
		);
	}
}
