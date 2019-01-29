import React, { Component } from 'react';
import dateFormat from 'dateformat';
import "./chat.css"

const dayInMillis = 60 * 60 * 24 * 1000;

export default class MessageArea extends Component {
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentDidUpdate() {
      window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const currentTime = new Date();

    return (
      <ol class="chat">
        {this.props.messages.map(({name, text, from, time}) => {
          if (from === 'visitor') {
            name = "You"
          }
          return (
            <li class={from}>
              <div class="msg">
                <p>{name ? name + ": " + text : text}</p>
                { (this.props.conf.displayMessageTime) ?
                    <div class="time">
                      {
                        currentTime - new Date(time) < dayInMillis ?
                          dateFormat(time, "HH:MM") :
                          dateFormat(time, "m/d/yy HH:MM")
                      }
                    </div>
                    :
                    ''
                }
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
}