import React, { Component } from 'react'
import Frame from './Frame';
import FloatingButton from './FloatingButton';
import Header from './Header';
import ArrowIcon from './ArrowIcon';
import {
  desktopTitleStyle, 
  desktopWrapperStyle,
  mobileOpenWrapperStyle, 
  mobileClosedWrapperStyle,
  desktopClosedWrapperStyleChat
} from "./styles";

export default class Widget extends Component {

  constructor(props) {
    super(props);
    this.state = {isChatOpen: false};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let stateData = {
      isChatOpen: !this.state.isChatOpen,
    }
    this.setState(stateData);
  };

  render() {
    const conf = this.props.conf;

    const wrapperWidth = {width: conf.desktopWidth};
    const desktopHeight = (window.innerHeight - 100 < conf.desktopHeight) ? window.innerHeight - 90 : conf.desktopHeight;
    // const wrapperHeight = {height: desktopHeight};

    let wrapperStyle;
    if (!this.state.isChatOpen && (this.props.isMobile || conf.alwaysUseFloatingButton)) {
      wrapperStyle = {...mobileClosedWrapperStyle}; // closed mobile floating button
    } else if (!this.props.isMobile) {
      wrapperStyle = (conf.closedStyle === 'chat' || this.state.isChatOpen) ?
        (this.state.isChatOpen) ?
          { ...desktopWrapperStyle, ...wrapperWidth} : // desktop mode, button style
          { ...desktopWrapperStyle}
        :
        { ...desktopClosedWrapperStyleChat}; // desktop mode, chat style
    } else {
      wrapperStyle = mobileOpenWrapperStyle; // open mobile wrapper should have no border
    }

    return (
      <div style={wrapperStyle}>
        { /* Open/close button */ }
        { (this.props.isMobile || conf.alwaysUseFloatingButton) && !this.state.isChatOpen ?

            <FloatingButton color={conf.mainColor} onClick={this.onClick}/>

            :

            (conf.closedStyle === 'chat' || this.state.isChatOpen) ?
              <div style={{background: conf.mainColor, ...desktopTitleStyle}} onClick={this.onClick}>
                <div style={{display: 'flex', alignItems: 'center', padding: '0px 30px 0px 0px'}}>
                  {this.state.isChatOpen ? conf.titleOpen : conf.titleClosed}
                </div>
                <ArrowIcon isOpened={this.state.isChatOpen}/>
              </div>
              :
              <Header onClick={this.onClick} conf={conf}/>
        }

        { /*Chat iFrame */ }
        <div style={{display: this.state.isChatOpen ? 'block' : 'none', height: this.props.isMobile ? '100%' : desktopHeight}}>
          <Frame {...this.props}></Frame>
        </div>

      </div>
    )
  }
};
