import * as React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import { View, TouchableOpacity, TextInput } from 'react-native';
import renderer from 'react-test-renderer';

import { SearchComponent } from '../src/Components/Search';


describe('SearchComponent', () => {
	describe('rendering', () => {
		let wrapper: ShallowWrapper;
		let mounting;
		const back = jest.fn(() => 'back_pressed');
		const close = jest.fn(() => 'close_pressed');
		const onChange = jest.fn((val) => val.value);
		const component = (
			<SearchComponent
				searchText={'search'}
				placeholderTextColor={'#ddd'}
				onClose={close}
				onBackRequest={back}
				forceSelect={false}
				setText={onChange}
			/>);
		beforeEach(() => {
			wrapper = shallow(component);
			mounting = mount(component);
		});

		test('should render a SearchComponent', () => {
			const render = renderer.create(component).toJSON();
			expect(render).toMatchSnapshot();
		});

		test('should render a <View />', () => {
			expect(wrapper.find(View)).toHaveLength(1);
		});

		test('should render a <TouchableOpacity />', () => {
			expect(wrapper.find(TouchableOpacity)).toHaveLength(2);
		});

		test('should render a <TextInput />', () => {
			expect(wrapper.find(TextInput)).toHaveLength(1);
		});

		test('should onBackRequest pressed', () => {
			back.mockReturnThis();
			wrapper.find(TouchableOpacity).first().simulate('press');
			expect(back).toHaveBeenCalled();
		});

		test('should onClose pressed', () => {
			back.mockReturnThis();
			wrapper.find(TouchableOpacity).last().simulate('press');
			expect(back).toHaveBeenCalled();
		});

		test('should forceSelect type is boolean', () => {
			expect(typeof mounting.props().forceSelect).toEqual('boolean');
		});

		test('should input typing fired changed method', () => {
			onChange.mockReturnValue('onchange_input');
			wrapper.find(TextInput).simulate('changeText', { target: { value: 'test' } });
			expect(onChange).toHaveBeenCalled();
		});

	});
});
