import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TouchableOpacity, Image } from 'react-native';
import renderer from 'react-test-renderer';

import { ScrollToTopComponent } from '../src/Components/ScrollToTop';


describe('ScrollToTopComponent', () => {
	describe('rendering', () => {
		let wrapper: ShallowWrapper;
		let props: Object;
		const spyOn = jest.fn();
		const component = (
			<ScrollToTopComponent {...props} stickyBottomButton={true} goToUp={spyOn} />
		)
		beforeEach(() => {
			wrapper = shallow(component);
		});

		test('should render a ScrollToTopComponent', () => {
			const render = renderer.create(component).toJSON();
			expect(render).toMatchSnapshot();
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
