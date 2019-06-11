// Global Imports
import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

// Local Imports
import { AlphabetStyle } from '@Styles';
import { IAlphabetsInDto } from '@Interfaces';

export class AlphabetComponent extends React.PureComponent<IAlphabetsInDto, {}> {

	public static defaultProps = {
		// tslint:disable-next-line: max-line-length
		alphabets: ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'Q', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'W', 'X', 'Y', 'Z'],
	};

	public render(): JSX.Element {
		const { alphabets, setAlphabet, selectedAlpha, showAlphabeticalIndex } = this.props;

		if (showAlphabeticalIndex) {
			return (
				<View style={AlphabetStyle.container}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="always">
						{
							alphabets.map((a: string, index: number) =>
								<TouchableOpacity onPress={() => setAlphabet(a)} key={index}
									style={AlphabetStyle.alphabetButton}>
									<Text
										style={[AlphabetStyle.alphabetText, selectedAlpha === a && AlphabetStyle.selected]}
									>
										{a}
									</Text>
								</TouchableOpacity>,
							)
						}
					</ScrollView>
				</View>

			);
		}
		return null;

	}

}
