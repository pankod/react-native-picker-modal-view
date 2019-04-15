// Global Imports
import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// Local Import
import { IListItemInDto } from '@Interfaces';
import { ListItemStyle } from '@Styles';

export class ListItemComponent extends React.Component<IListItemInDto, {}> {
	public render(): JSX.Element {
		const { onChangeMethod } = this.props;
		const { Name } = this.props.list;
		return (
			<TouchableOpacity
				style={ListItemStyle.container}
				activeOpacity={0.7}
				onPress={() => onChangeMethod(this.props.list)}
			>
				<View style={ListItemStyle.btnContainer}>
					<Text>{Name}</Text>
				</View >
			</TouchableOpacity >
		);
	}
}
