import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { ScrollToTopStyle } from '../Assets/Styles';
export class ScrollToTopComponent extends React.PureComponent {
    render() {
        const { goToUp } = this.props;
        return (React.createElement(TouchableOpacity, { onPress: () => goToUp(), activeOpacity: 0.8, style: ScrollToTopStyle.container },
            React.createElement(Image, { source: require('../Assets/Images/up.png'), style: ScrollToTopStyle.upBtn })));
    }
}
//# sourceMappingURL=ScrollToTop.js.map