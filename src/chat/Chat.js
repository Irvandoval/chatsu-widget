import React, { Component } from 'react';
import MessageArea from "./MessageArea";

export default class Chat extends Component {

  constructor(props) {
    super(props);
    const store = this.props.store;
    if (store.enabled) {
      this.messagesKey = 'messages' + '.' + props.chatId + '.' + props.host;
      const messagevalue = store.get(this.messagesKey) || store.set(this.messagesKey, []);
      this.state = {
        message: messagevalue
      };
    } else {
      this.state = {
        message: []
      };
    }

    this.autoResponseState = 'active';
    this.autoResponseTime = 0;
  }

  componentDidMount() {
    // make connection
  }

  handleKeyPress(e) {
    if (e.keyCode == 13 && this.input.value) {
      let text = this.input.value;
      this.socket.send({text, from: 'visitor', visitorName: this.props.conf.visitorName});
      this.input.value = '';

      if (this.autoResponseState === 'active') {
        setTimeout(() => {
          this.writeToMessages({
            text: this.props.conf.autoResponse,
            from: 'admin'
          });
        }, 500);

        this.autoResponseTimer = setTimeout(() => {
          this.writeToMessages({
            text: this.props.conf.autoNoResponse,
            from: 'admin'
          });
          this.autoResponseState = 'canceled';
        }, 60 * 1000);
        this.autoResponseState = 'set';
      };
    };
  };

  incomingMessage(msg) {
    this.writeToMessages(msg);
    if (msg.from === 'admin') {
      document.getElementById('messageSound').play();
      
      if (this.autoResponseState === 'active') {
        this.autoResponseState = 'canceled';
      } else if (this.autoResponseState === 'set') {
        this.autoResponseState = 'canceled';
        clearTimeout(this.autoResponseTimer);
      }
    }  
  };

  writeToMessages(msg) {
    msg.time = new Date();
    this.setState({
      message: [...this.state.messages, (msg)]
    });

    if (store.enabled) {
      try {
        store.transact(this.messagesKey, messages => messages.push(msg));
      } catch (e) {
        console.log('failed to add new message to local storage', e);
        store.set(this.messagesKey, []);
      }
    }
  }

  render() {
    return (
      <div>
        <MessageArea messages={this.state.message} conf={this.props.conf}/>

        <input class="textarea" type="text" placeholder={this.props.conf.placeholderText}
          ref={input => this.input = input}
          onKeyPress={this.handleKeyPress}
        />

        <a class="banner" href="https://github.com/serenovaLLC" target="_blank">
          Powered by <b>Serenova</b>
        </a>
      </div>
    );
  }
}