import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Input from '../Input'

const defaultProps = {
    input : 'search',
    onChangeHandler : jest.fn(),
    currentLocation: 'http://localhost:3000/'
};

const setup = (props = defaultProps) => {
    const wrapper = shallow(<Input {...props} />);
    return {
        wrapper,
        props
    };
};

describe('TEST Search input component ', () => {

    test('TEST Should match the snapshot.', () => {
        const { wrapper } = setup();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});
