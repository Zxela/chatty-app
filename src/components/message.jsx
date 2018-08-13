import React from 'react';

const Message = function(props) {
  return (
    <div className="message" key={props.index}>
      <span className="message-username" style={props.userColor}>
        {props.message.username}
      </span>
      <span className="message-content">{props.message.content}</span>
    </div>
  );
};
export default Message;
