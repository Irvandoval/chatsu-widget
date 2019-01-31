import React from 'react';
import Header from '../Header';
import { JSDOM } from 'jsdom';
import { shallow } from 'enzyme';

const onClick = jest.fn();
const config = {};

describe('<Header />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Header onClick={onClick} config={config}/>);
    expect(tree).toMatchSnapshot();
  });
})