import React from 'react';
import MessageArea from '../MessageArea';
import TestRenderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
global.window.scrollTo = function() {
    return;
};

describe('<MessageArea />', () => {
    it('matches the snapshot', () => {
      const messages = [];
      const tree = TestRenderer.create(<MessageArea messages={messages}/>);
      expect(tree).toMatchSnapshot();
    });
})