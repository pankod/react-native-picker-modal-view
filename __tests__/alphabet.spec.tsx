import * as React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { AlphabetComponent } from '../src/Components/Alphabet';

describe('AlphabetComponent', () => {
	describe('rendering', () => {
		let wrapper: ShallowWrapper;
		let mounting;
		const spyOn = jest.fn(() => "A");
		let component = (
			<AlphabetComponent
				selectedAlpha={'A'}
				alphabets={['A', 'B']}
				setAlphabet={spyOn}
				showAlphabeticalIndex
			/>
		);
		beforeEach(() => {
			wrapper = shallow(component);
			mounting = mount(component);
		});


		test('should render a AlphabetComponent', () => {
			const render = renderer.create(component).toJSON();
			expect(render).toMatchSnapshot();
		});

		test('should render a <View />', () => {
			expect(wrapper.find(View)).toHaveLength(1);
		});

		test('should render a <ScrollView />', () => {
			expect(wrapper.find(ScrollView)).toHaveLength(1);
		});

		test('should alphabets prop is array', () => {
			expect(Array.isArray(mounting.props().alphabets)).toBeTruthy();
		});

		test('should selectedAlpha prop is string', () => {
			expect(typeof mounting.props().selectedAlpha).toBe('string');
		});

		test('should setAlphabet prop set any string', () => {
			spyOn.mockReturnValue("A");
			wrapper.find(TouchableOpacity).first().simulate('press');
			expect(spyOn).toHaveBeenCalled();
		});

	});
});
