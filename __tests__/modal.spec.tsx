import * as React from 'react';
import { Button, Text } from 'react-native';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { ModalComponent } from '../src/Components/Modal';

describe('ModalComponent', () => {
	describe('rendering', () => {
		let Platform;
		let wrapper: ShallowWrapper;
		let wrapperV2: ShallowWrapper;
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
			searchPlaceholderText={'Search...'}
			autoSort={false}
			disabled={false}
			selected={data}
			requireSelection={false}
			backButtonDisabled={false}
		/>);

		beforeEach(() => {
			wrapper = shallow(component);
			mounting = mount(component);

			Platform = require('react-native').Platform;
		});

		test('should call setState when mounted', () => {

			const _wrapper = shallow(<ModalComponent
				showAlphabeticalIndex={false}
				onClosed={onRequestClosed}
				onBackButtonPressed={onBackRequest}
				onSelected={onSelected}
				items={list}
				alphabeticalIndexChars={['A', 'B', 'C', 'D', 'E']}
				searchInputTextColor={'#ddd'}
				autoGenerateAlphabeticalIndex={false}
				showToTopButton={true}
				onEndReached={onEndReached}
				removeClippedSubviews={false}
				selectPlaceholderText={'Choose one...'}
				searchPlaceholderText={'Search...'}
				autoSort={false}
				disabled={false}
				requireSelection={false}
				backButtonDisabled={false}
			/>);
			expect(_wrapper.state('alphabeticalIndexChars')).toEqual(['A', 'B', 'C', 'D', 'E']);

		})

		test('should call Flatlist keyExtractor with keyExtractor property', () => {
			const _keyExtractor = jest.fn();

			mounting.setProps({ keyExtractor: _keyExtractor })

			mounting.update();
			mounting.find('FlatList').instance().props.keyExtractor();

			expect(_keyExtractor).toHaveBeenCalled();
		})

		test('should call Flatlist keyExtractor without keyExtractor property', () => {
			expect(mounting.find('FlatList').instance().props.keyExtractor({}, 1)).toBe("1")
		})

		test('should call Modal onRequestClose', () => {
			const _onclose = jest.fn();

			mounting.setProps({ onClosed: _onclose })

			mounting.update();
			mounting.find('Modal').instance().props.onRequestClose()();

			expect(_onclose).toHaveBeenCalled();
		})

		test('should call SearchComponent setText', () => {
			const spy = spyOn(ModalComponent.prototype, 'setText').and.callThrough();
			mounting.find('SearchComponent').instance().props.setText('Pankod');

			expect(spy).toHaveBeenCalledTimes(1);
		})

		test('should call FlatList onScrolling contentOffset > 100', () => {
			mounting.setProps({ showToTopButton: true })
			const e = {
				nativeEvent: {
					contentOffset: {
						y: 101
					}
				}
			}

			mounting.update();
			const spy = spyOn(ModalComponent.prototype, 'onScrolling').and.callThrough();
			const instance = mounting.instance() as any;

			instance.onScrolling(e);

			expect(spy).toHaveBeenCalledTimes(1);
			expect(mounting.state('stickyBottomButton')).toBeTruthy();

		})

		test('should call FlatList onScrolling contentOffset < 100', () => {
			mounting.setProps({ showToTopButton: true })
			const e = {
				nativeEvent: {
					contentOffset: {
						y: 99
					}
				}
			}

			mounting.update();
			const spy = spyOn(ModalComponent.prototype, 'onScrolling').and.callThrough();
			const instance = mounting.instance() as any;

			instance.onScrolling(e);

			expect(spy).toHaveBeenCalledTimes(1);
			expect(mounting.state('stickyBottomButton')).not.toBeTruthy();

		})

		test('should call FlatList onViewableItemsChanged prop', () => {
			const instance = wrapper.instance() as any;
			const viewableItems = [
				{
					"index": 165,
					"isViewable": true,
					"item": {
						"Code": "PW",
						"Id": 166,
						"Name": "Palau",
						"Value": "Palau",
					},
					"key": "165",
				},
				{
					"index": 166,
					"isViewable": true,
					"item": {
						"Code": "PS",
						"Id": 167,
						"Name": "Palestinian Territory, Occupied",
						"Value": "Palestinian Territory, Occupied",
					},
					"key": "166",
				},
			]

			instance._onViewableItemsChanged({ viewableItems });

			mounting.setState({
				selectedAlpha: viewableItems[0].item.Name.charAt(0)
			});

			expect(viewableItems[0].item.Name.charAt(0)).toEqual('P');
			expect(mounting.state('selectedAlpha')).toEqual('P');
		})

		test('should call FlatList renderItem prop', () => {
			const onSelectMethodSpy = spyOn(ModalComponent.prototype, 'onSelectMethod').and.callFake(jest.fn());

			let _renderListItem = (selectedItem, listItem) => <Text key={listItem.Id}>{listItem.Name}</Text>;

			mounting.setProps({ renderListItem: _renderListItem });
			mounting.update();

			mounting.find('FlatList').find('TouchableOpacity').first().props().onPress();

			expect(onSelectMethodSpy).toHaveBeenCalledTimes(1);
		});


		test('should call AlphabetComponent setAlphabet prop', () => {
			const spy = spyOn(ModalComponent.prototype, 'setAlphabet').and.callThrough();
			mounting.find('AlphabetComponent').instance().props.setAlphabet('P');

			expect(spy).toHaveBeenCalledTimes(1);

		});

		test('should call AlphabetComponent setAlphabet if', () => {
			const spy = spyOn(ModalComponent.prototype, 'setAlphabet').and.callThrough();

			mounting.instance().setAlphabet('P');
			jest.runAllTimers();

			mounting.update(); // <--- force re-render of the component

			expect(spy).toHaveBeenCalledTimes(1);

		});


		describe('android tests should  call KeyboardAvoidingView ', () => {
			beforeEach(() => {
				Platform.OS = 'android';
				wrapper = shallow(component);
			});

			test('should behavior props null on Android', () => {
				expect(wrapper.find('KeyboardAvoidingView').prop('behavior')).toEqual(null);
			});
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


		test('should (showAlphabeticalIndex,autoGenerateAlphabeticalIndex,alphabeticalIndexChars,autoCorrect,autoSort,disabledforceSelect) type is boolean ', () => {
			expect(typeof mounting.props().showAlphabeticalIndex).toBe('boolean');
			expect(typeof mounting.props().autoGenerateAlphabeticalIndex).toBe('boolean');
			expect(typeof mounting.props().alphabeticalIndexChars).toBe('object');
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
			instance.openModal();

			instance.onClose();

			expect(spy).toHaveBeenCalledTimes(1);
			mounting.update();

			setTimeout(() => {
				expect(wrapper.state()).toMatchObject({
					...wrapper.state(),
					selectedObject: {},
					modalVisible: false,
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

		test('should render a renderListItem', () => {
			const selectListItemView = () => <Button title="renderListItem" onPress={jest.fn()} />;
			mounting.setProps({
				renderListItem: selectListItemView
			});

			expect(mounting.find({ title: "renderListItem" })).toHaveLength(list.length);
		});

		test('should render a renderSelectView', () => {
			const selectView = () => <Button title="renderSelectView" onPress={jest.fn()} />;
			mounting.setProps({
				renderSelectView: selectView
			});

			expect(mounting.find({ title: "renderSelectView" })).toHaveLength(1);
		});
	});
});
