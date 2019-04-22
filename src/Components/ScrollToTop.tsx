// Global Imports
import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';

// Local Imports
import { ScrollToTopStyle } from '@Styles';
import { IScrollToTop } from '@Interfaces';

export class ScrollToTopComponent extends React.PureComponent<IScrollToTop, {}> {
	public render(): JSX.Element {
		const { goToUp } = this.props;
		return (
			<TouchableOpacity onPress={() => goToUp()} activeOpacity={0.8} style={ScrollToTopStyle.container}>
				<Image source={require('../Assets/Images/up.png')} style={ScrollToTopStyle.upBtn} />
			</TouchableOpacity>
		);
	}
}
