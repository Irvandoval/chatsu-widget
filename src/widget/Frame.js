import React, { Component } from 'react';

export default class Frame extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let dynamicConf = window.chatWidgetOnOpen || {};
    let encodedConf = encodeURIComponent(JSON.stringify({...this.props.conf, ...this.props.dynamicConf}));
    return (
      <iframe
        title='CxChatWidgetiFrame'
        src={`${this.props.iFrameSrc}?id=${this.props.chatWidgetId}&host=${this.props.host}&conf=${encodedConf}`}
        width='100%'
        height={this.props.isMobile ? '94%' : '100%'}
        frameBorder='0'>
      </iframe>
    )
  }
}