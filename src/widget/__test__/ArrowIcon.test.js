import React from 'react';
import ArrowIcon from '../ArrowIcon';
import { JSDOM } from 'jsdom';
import { shallow } from 'enzyme';

describe('<ArrowIcon />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<ArrowIcon />);
    expect(tree).toMatchSnapshot();
  });
})