import React from 'react';
import Header from '../Header';
import { JSDOM } from 'jsdom';
import { shallow } from 'enzyme';

const onClick = jest.fn();

const conf = {
  closedStyle: "chat",
  desktopHeight: 450,
  desktopWidth: 370,
  displayMessageTime: true
};

describe('<Header />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Header onClick={onClick} conf={conf}/>);
    expect(tree).toMatchSnapshot();
  });
})