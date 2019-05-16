import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('@pankod/project-splash', () => 'true');
jest.useFakeTimers();
