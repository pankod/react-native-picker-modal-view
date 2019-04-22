import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TouchableOpacity, Image } from 'react-native';

import { ScrollToTopComponent } from '../src/Components/ScrollToTop';


describe('ScrollToTopComponent', () => {
	describe('rendering', () => {
		let wrapper: ShallowWrapper;
		let props: Object;
		const spyOn = jest.fn();
		beforeEach(() => {
			wrapper = shallow(<ScrollToTopComponent {...props} goToUp={spyOn} />);
		});

		test('should render a <TouchableOpacity />', () => {
			expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
		});

		test('should render a <Image />', () => {
			expect(wrapper.find(Image)).toHaveLength(1);
		});

		test('should goToUp is pressed', () => {
			spyOn.mockReturnThis();
			wrapper.find(TouchableOpacity).first().simulate('press');
			expect(spyOn).toHaveBeenCalled();
		})

	});
});
