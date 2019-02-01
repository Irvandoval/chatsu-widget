import React from 'react';
import Widget from '../Widget';
import FloatingButton from '../FloatingButton';
import { shallow, mount } from 'enzyme';
import { JSDOM } from 'jsdom';

const dom = new JSDOM()
const conf = {
  closedStyle: "chat",
  desktopHeight: 450,
  desktopWidth: 370,
  displayMessageTime: true
};

const iframeSrc = 'http://localhost:8080/chat.html';
const host = 'localhost:8080'

global.document = dom.window.document;
global.window = dom.window;
global.window.chatWidgetId = 643227833;
global.window.intergramServer = "https://young-savannah-26087.herokuapp.com"

describe('<Widget />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Widget conf={conf} iframeSrc={iframeSrc} />);
    expect(tree).toMatchSnapshot();
  });

  it('shows floating button in mobile conf', () => {
    global.window.innerHeight = 500;
    const conf = { desktopHeight: 1000 };
    const wrapper = mount(<Widget conf={conf} host={host} iFrameSrc={iframeSrc} widgetId={global.window.chatWidgetId} isMobile={true} />);
    expect(wrapper.find(FloatingButton)).toHaveLength(1);
  });
})