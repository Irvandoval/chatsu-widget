import React from 'react';
import Widget from '../Widget';
import { shallow } from 'enzyme';

const conf ={};

describe('<Widget />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Widget conf={conf}/>);
    expect(tree).toMatchSnapshot();
  });
})