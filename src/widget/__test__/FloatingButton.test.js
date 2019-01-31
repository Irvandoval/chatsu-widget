import React from 'react';
import FloatingButton from '../FloatingButton';
import { JSDOM } from 'jsdom';
import { shallow } from 'enzyme';

describe('<FloatingButton />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<FloatingButton />);
    expect(tree).toMatchSnapshot();
  });
})