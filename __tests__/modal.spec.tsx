import * as React from 'react';
import { View, ScrollView, Modal } from 'react-native';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { ModalComponent } from '../src/Components/Modal';
import { any } from 'prop-types';

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
				Name: 'Ali Doe',
				Value: 'Ali Doe',
			},
			{
				Id: 3,
				Name: 'Çetin Doe',
				Value: 'Çetin Doe',
			},
			{
				Id: 4,
				Name: 'Şule Doe',
				Value: 'Şule Doe',
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
			showAlphabeticalIndex={false}
			onClosed={onRequestClosed}
			onBackButtonPressed={onBackRequest}
			onSelected={onSelected}
			items={list}
			alphabeticalIndexChars={['A', 'B', 'C', 'D', 'E']}
			searchInputTextColor={'#ddd'}
			autoGenerateAlphabeticalIndex={true}
			showToTopButton={true}
			onEndReached={onEndReached}
			removeClippedSubviews={false}
			selectPlaceholderText={'Choose one...'}
			selected={data}
			searchPlaceholderText={'Search...'}
			autoSort={false}
			disabled={false}
			requireSelection={false}
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

		test('should (showAlphabeticalIndex,autoGenerateAlphabeticalIndex,autoCorrect,autoSort,disabledforceSelect) type is boolean ', () => {
			expect(typeof mounting.props().showAlphabeticalIndex).toBe('boolean');
			expect(typeof mounting.props().autoGenerateAlphabeticalIndex).toBe('boolean');
			expect(typeof mounting.props().autoSort).toBe('boolean');
			expect(typeof mounting.props().requireSelection).toBe('boolean');
		});

		test('should fired onSelected prop', () => {
			expect(typeof mounting.props().onSelected).toBe('function');
		});

		test('should fired onClosed prop', () => {
			expect(typeof mounting.props().onClosed).toBe('function');
		});

		test('should fired onBackButtonPressed prop', () => {
			expect(typeof mounting.props().onBackButtonPressed).toBe('function');
		});

		test('should fired onEndReached prop', () => {
			expect(typeof mounting.props().onEndReached).toBe('function');
		});

		test('should clearComponent function set default state', () => {
			const spy = spyOn(ModalComponent.prototype, 'clearComponent').and.callThrough();
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
			const spy = spyOn(ModalComponent.prototype, 'openModal').and.callThrough();
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

		test('should onclose fired modal close', () => {
			const spy = spyOn(ModalComponent.prototype, 'onClose').and.callThrough();
			const instance = mounting.instance() as any;
			instance.onClose();
			expect(spy).toHaveBeenCalledTimes(1);
			setTimeout(() => {
				expect(wrapper.state()).toMatchObject({
					selectedObject: {},
					modalVisible: false
				})
			}, 0);
		});

		test('should onbackrequest fired back', () => {
			const spy = spyOn(ModalComponent.prototype, 'onBackRequest').and.callThrough();
			const instance = mounting.instance() as any;
			instance.onBackRequest();
			expect(spy).toHaveBeenCalledTimes(1);
			setTimeout(() => {
				expect(wrapper.state('modalVisible')).not.toBeTruthy();
			}, 0);
		});

		test('should scrollToUp fired flatlist scroll to offset 0 and selectedAlpha set to null', () => {
			const spy = spyOn(ModalComponent.prototype, 'scrollToUp').and.callThrough();
			const instance = mounting.instance() as any;
			instance.scrollToUp();
			expect(spy).toHaveBeenCalledTimes(1);
			setTimeout(() => {
				expect(wrapper.state('selectedAlpha')).not.toBeTruthy();
			}, 0);
		});

		test('should auto generate alphabets array with list', () => {
			const spy = spyOn(ModalComponent.prototype, 'generateAlphabet').and.callThrough();
			const instance = mounting.instance() as any;
			mounting.setProps({
				list
			});

			const stateLength: string[] = mounting.state('alphabeticalIndexChars').length;
			const propsLength: string[] = mounting.props().list.length;

			expect(stateLength).toEqual(propsLength);

			instance.generateAlphabet();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		test('should text set to state', () => {
			const spy = spyOn(ModalComponent.prototype, 'setText').and.callThrough();
			const instance = mounting.instance() as any;
			const text = 'Test Text';

			wrapper.setState({
				searchText: text
			});

			expect(wrapper.state('searchText')).toEqual(text);

			instance.setText(text);
			expect(spy).toHaveBeenCalled();
		});

		test('should get filtered list data', () => {
			const spy = spyOn(ModalComponent.prototype, 'getFilteredData').and.callThrough();
			const instance = wrapper.instance() as any;

			// get all list
			expect(instance.getFilteredData()).toMatchObject(list);

			wrapper.setState({
				searchText: 'Şule'
			});

			expect(spy).toHaveBeenCalled();

			// get filtered list
			expect(instance.getFilteredData()).toMatchObject([{
				Id: 4,
				Name: 'Şule Doe',
				Value: 'Şule Doe',
			}]);
		});

		test('should get selected', () => {
			const spy = spyOn(ModalComponent.prototype, 'onSelectMethod').and.callThrough();
			const instance = wrapper.instance() as any;
			const dummyData = {
				Id: 4,
				Name: 'Şule Doe',
				Value: 'Şule Doe',
			};

			wrapper.setState(dummyData);

			expect(instance.onSelectMethod(dummyData)).toMatchObject(dummyData);
			expect(wrapper.state()).toMatchObject({
				modalVisible: false,
				selectedObject: dummyData
			});
			expect(instance.onSelectMethod()).toBeUndefined();
			expect(spy).toBeCalled()
		});

		test('should get index in list array', () => {
			const spy = spyOn(ModalComponent.prototype, 'getIndex').and.callThrough();
			const instance = mounting.instance() as any;

			// A defined in the prefined list
			expect(instance.getIndex('A')).toEqual(1);

			// Z not defined in the predefined list
			expect(instance.getIndex('Z')).toEqual(-1);
			expect(spy).toHaveBeenCalled();
		});

		test('should press and set alphabet, scroll offset for flatlist', () => {
			const spy = spyOn(ModalComponent.prototype, 'setAlphabet').and.callThrough();
			const instance = mounting.instance() as any;
			const selectedAlpha = 'A';

			wrapper.setState({
				selectedAlpha
			});

			instance.setAlphabet(selectedAlpha);
			expect(spy).toHaveBeenCalled();

			setTimeout(() => {
				expect(wrapper.state('selectedAlpha')).toEqual(selectedAlpha);
			}, 0);
		});

	});
});
