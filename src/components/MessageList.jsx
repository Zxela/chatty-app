import React, { Component } from 'react';
import Message from './message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  renderMessage = () => {
    return this.props.messages.map((message, index) => {
      if (message.type === 'newMessage') {
        let userColor = { color: message.userColor };
        return (
          <Message userColor={userColor} message={message} index={index} />
        );
      } else if (message.type === 'notification') {
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
