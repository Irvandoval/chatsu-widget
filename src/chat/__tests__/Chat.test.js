import React from 'react';
import Chat from  '../Chat';
import TestRenderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';

const dom = new JSDOM()
global.document = dom.window.document;
global.window = dom.window;
global.window.scrollTo = function() {
  return;
};

class mockStore {
  constructor() {
    this.enabled = false;
  }

  transact(key, func) {
    console.log(`key is ${key} and function is omitted`);
  }

  set(key, arr) {
    console.log(`key is ${key} and array is ${arr}`)
  }

  get(val) {
    return val;
  }
}

const store = new mockStore();

describe('<Chat />', () => {
  it('matches the snapshot', () => {
    const tree = TestRenderer.create(<Chat conf={{placeholderText: 'test'}} store={store}/>) ;
    expect(tree).toMatchSnapshot();
  });
});