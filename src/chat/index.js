import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import * as store from 'store';

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getUserId() {
  if (store.enabled) {
      return store.get('userId') || store.set('userId', generateRandomId());
  } else {
      return generateRandomId();
  }
}

function generateRandomId() {
  return Math.random().toString(36).substr(2, 6);
}

function ChatIndex() {
  let conf = {};
  const confString = getUrlParameter('conf');
  if (confString) {
    try {
        conf = JSON.parse(confString);
    } catch (e) {
        console.log('Failed to parse conf', confString, e);
    }
  }
  const url = getUrlParameter('id');
  const userId = getUserId();
  const urlParameter = getUrlParameter('host');

  ReactDOM.render(
    <Chat
      chatId={url}
      userId={userId}
      host={urlParameter}
      conf={conf}
    />,
    document.getElementById('chatWidget')
  );
}

if(window.attachEvent) {
  window.attachEvent('onload', ChatIndex);
} else {
  window.addEventListener('load', ChatIndex, false);
}
