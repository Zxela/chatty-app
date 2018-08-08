import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(event.target.closest('form').children);
      const username = event.target.closest('form').children[0];
      const message = event.target.closest('form').children[1];
      this.props.addMessage(username.value, message.value);
      message.value = '';
    }
  };
  render() {
    return (
      <footer>
        <form onKeyPress={this.handleKeyPress} className="chatbar">
          <input id="chatbar-username" name="username" className="chatbar-username" defaultValue={this.props.currentUser.name} />
          <input id="chatbar-message" name="message" className="chatbar-message" placeholder="placeholder" defaultValue="" />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
