// Global Imports
import * as React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';

// Local Imports
import { SearchStyle } from '@Styles';
import { ISearch } from '@Interfaces';

export class SearchComponent extends React.PureComponent<ISearch, {}> {
	public render(): JSX.Element {
		const {
			SearchInputProps,
			autoCorrect,
			placeholderTextColor,
			onClose,
			setText,
			closeable,
			searchText,
			onBackRequest,
		} = this.props;
		return (
			<View style={SearchStyle.searchArea}>

				<TouchableOpacity onPress={() => onBackRequest()}>
					<Image source={require('../Assets/Images/left-arrow.png')} style={SearchStyle.backButton} />
				</TouchableOpacity>

				<TextInput
					placeholder={searchText}
					placeholderTextColor={placeholderTextColor}
					style={SearchStyle.textInput}
					underlineColorAndroid={'transparent'}
					onChangeText={(text: string) => setText(text)}
					autoCorrect={autoCorrect}
					{...SearchInputProps}
				/>
				{closeable &&
					<TouchableOpacity onPress={() => onClose()}>
						<Image source={require('../Assets/Images/close.png')} style={SearchStyle.closeButton} />
					</TouchableOpacity>
				}
			</View>
		);
	}
}
