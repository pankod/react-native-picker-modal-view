// Global Imports
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// Local Imports
import { ISelectBoxProps } from '@Interfaces';
import { SelectBoxStyle } from '@Styles';

export class SelectBoxComponent extends React.PureComponent<ISelectBoxProps, {}> {
	public render(): JSX.Element {
		const { openModal, selectedObject, chooseText } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => openModal()}
			>
				<View style={SelectBoxStyle.container}>
					{
						!selectedObject ?
							<Text style={SelectBoxStyle.chooseText}>{chooseText}</Text> :
							<Text style={SelectBoxStyle.chooseText}>{selectedObject.Name}</Text>
					}
					<Image source={require('../Assets/Images/down.png')} style={SelectBoxStyle.downBtn} />
				</View>
			</TouchableOpacity>
		);
	}
}
