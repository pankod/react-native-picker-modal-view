// Global Imports
import * as React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';

// Local Imports
import { SearchStyle } from '@Styles';
import { ISearch } from '@Interfaces';

export class SearchComponent extends React.PureComponent<ISearch, {}> {
	public render(): JSX.Element {
		const { placeholderTextColor, onClose, setText, closeable } = this.props;
		return (
			<View style={SearchStyle.searchArea}>
				<TextInput
					placeholder={'Search...'}
					placeholderTextColor={placeholderTextColor}
					style={SearchStyle.textInput}
					underlineColorAndroid={'transparent'}
					onChangeText={(text: string) => setText(text)}
				/>
				{closeable &&
					<TouchableOpacity onPress={() => onClose()}>
						<Image source={require('../Assets/Images/close.png')} style={SearchStyle.closeButton} />
					</TouchableOpacity>
				}
			</View>
		)
	}
}
