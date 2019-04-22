import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { ModalComponent } from '../src/Components/Modal';
import { ListItemComponent } from '../src/Components/ListItem';
import { Component } from 'react';

describe('ModalComponent', () => {
	describe('rendering', () => {
		let wrapper: ShallowWrapper;
		let mounting;
		const data = {
			Id: 1,
			Name: 'John Doe',
			Value: 'John Doe',
		};

		const list = [
			{
				Id: 1,
				Name: 'John Doe',
				Value: 'John Doe',
			},
			{
				Id: 2,
				Name: 'John Doe',
				Value: 'John Doe',
			}
		];
		const onSelected = jest.fn((a) => a);
		const onRequestClosed = jest.fn();
		const onBackRequest = jest.fn();
		const onEndReached = jest.fn();
		const state = {
			modalVisible: false,
			searchText: '',
			stickyBottomButton: false,
			selectedAlpha: null,
			selectedObject: {},
		}
		const component = (<ModalComponent
			hideAlphabetFilter={false}
			onRequestClosed={onRequestClosed}
			onBackRequest={onBackRequest}
			onSelected={onSelected}
			list={list}
			alphabets={['A', 'B']}
			placeholderTextColor={'#ddd'}
			autoGenerateAlphabet={true}
			showToTopButton={true}
			onEndReached={onEndReached}
			removeClippedSubviews={false}
			chooseText={'Choose one...'}
			defaultSelected={data}
			searchText={'Search...'}
			autoCorrect={false}
			autoSort={true}
			disabled={false}
			forceSelect={false}
		/>);

		beforeEach(() => {
			wrapper = shallow(component);
			mounting = mount(component);
		});

		test('should render a Modal Component', () => {
			const render = renderer.create(component).toJSON();
			expect(typeof wrapper.state('modalVisible')).toBe('boolean');
			expect(typeof wrapper.state('searchText')).toBe('string');
			expect(wrapper.state('selectedAlpha')).toBeDefined;
			expect(typeof wrapper.state('stickyBottomButton')).toBe('boolean');
			expect(typeof wrapper.state('selectedObject')).toBe('object');
			expect(render).toMatchSnapshot();
		});

		test('should (hideAlphabetFilter,autoGenerateAlphabet,autoCorrect,autoSort,disabledforceSelect) type is boolean ', () => {
			expect(typeof mounting.props().hideAlphabetFilter).toBe('boolean');
			expect(typeof mounting.props().autoGenerateAlphabet).toBe('boolean');
			expect(typeof mounting.props().autoCorrect).toBe('boolean');
			expect(typeof mounting.props().autoSort).toBe('boolean');
			expect(typeof mounting.props().forceSelect).toBe('boolean');
		});

		test('should fired onSelected prop', () => {
			expect(typeof mounting.props().onSelected).toBe('function');
		});

		test('should fired onRequestClosed prop', () => {
			expect(typeof mounting.props().onRequestClosed).toBe('function');
		});

		test('should fired onBackRequest prop', () => {
			expect(typeof mounting.props().onBackRequest).toBe('function');
		});

		test('should fired onEndReached prop', () => {
			expect(typeof mounting.props().onEndReached).toBe('function');
		});

		test('should clearComponent function set default state', () => {
			const spy = spyOn(ModalComponent.prototype, 'clearComponent');
			const instance = mounting.instance() as any;
			instance.clearComponent();
			expect(spy).toHaveBeenCalledTimes(1);
			expect(wrapper.state()).toMatchObject({
				stickyBottomButton: false,
				searchText: '',
				selectedAlpha: null
			});
		});

		test('should openmodal fired modal is open', () => {
			const spy = spyOn(ModalComponent.prototype, 'openModal');
			const instance = mounting.instance() as any;
			mounting.setProps({
				disabled: false
			});
			instance.openModal();
			expect(spy).toHaveBeenCalledTimes(1);
			setTimeout(() => {
				expect(wrapper.state('modalVisible')).toBeTruthy();
			}, 0);
		});



	});
});
