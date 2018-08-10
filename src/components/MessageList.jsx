import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  renderMessage = () => {
    return this.props.messages.map((message, index) => {
      if (message.type === 'newMessage') {
        let userColor = { color: message.userColor };
        return (
          <div className="message" key={index}>
            <span className="message-username" style={userColor}>
              {message.username}
            </span>
            <span className="message-content">{message.content}</span>
          </div>
        );
      } else {
        return (
          <div className="message system notification">
            <span className="notification-content">{message.content}</span>
          </div>
        );
      }
    });
  };

  render() {
    return <div>{this.renderMessage()}</div>;
  }
}
export default MessageList;
