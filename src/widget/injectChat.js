import React from 'react'
import ReactDOM from 'react-dom';
import Widget from './Widget';

const injectChat = () => {

  let root = document.createElement('div');
  root.id = 'CxChatWidget';
  document.getElementsByTagName('body')[0].appendChild(root);
  const server = window.chatWidgetServer || '';
  const iFrameSrc = `${server}/chat.html`;
  const host = window.location.host || 'unknown-host';
  const conf = {};

  ReactDOM.render(<Widget 
    widgetId={window.chatWidgetId}
    host={host}
    isMobile={window.screen.width < 500}
    iFrameSrc={iFrameSrc}
    conf={conf}
  />, document.getElementById('CxChatWidget'));
}

if(window.attachEvent) {
  window.attachEvent('onload', injectChat);
} else {
  window.addEventListener('load', injectChat, false);
}
