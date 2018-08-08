import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit = event => {
    debugger;
    event.preventDefault();
    const username = event.target.username;
    const message = event.target.message;
    this.props.addMessage(username.value, message.value);
    message.value = '';
  };
  render() {
    return (
      <footer>
        <form onSubmit={this.props.onSubmit} className="chatbar">
          <input name="username" className="chatbar-username" defaultValue={this.props.currentUser.name} />
          <input name="message" className="chatbar-message" placeholder="placeholder" defaultValue="" />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
