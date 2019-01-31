import React from 'react';
import MessageArea from '../MessageArea';
import { JSDOM } from 'jsdom';
import { shallow } from 'enzyme';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
global.window.scrollTo = function() {
    return;
};

describe('<MessageArea />', () => {
    it('matches the snapshot', () => {
      const messages = [];
      const tree = shallow(<MessageArea messages={messages}/>);
      expect(tree).toMatchSnapshot();
    });
})