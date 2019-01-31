import React from 'react';
import Frame from '../Frame';
import { JSDOM } from 'jsdom';
import { shallow } from 'enzyme';

describe('<Frame />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Frame />);
    expect(tree).toMatchSnapshot();
  });
})