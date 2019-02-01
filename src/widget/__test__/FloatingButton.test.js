import React from 'react';
import FloatingButton from '../FloatingButton';
import { JSDOM } from 'jsdom';
import { shallow } from 'enzyme';

const func = () => {return 21};
console.log(func)
describe('<FloatingButton />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<FloatingButton onClick={func} />);
    expect(tree).toMatchSnapshot();
  });
})