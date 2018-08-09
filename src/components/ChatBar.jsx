import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserName: this.props.currentUser.name,
      message: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.callSetUser = this.callSetUser.bind(this);
  }

  callSetUser(event) {
    this.setState({ currentUserName: event.target.value });
  }
  setMessage(event) {
    this.setState({ message: event.target.value });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(this.state.message); //log to show message
      this.props.setUser(this.state.currentUserName);
      this.props.addMessage(this.state.currentUserName, this.state.message);
      this.setState({ message: '' });
    }
  }

  render() {
    return (
      <footer>
        <form onKeyPress={this.handleKeyPress} className="chatbar">
          <input
            id="chatbar-username"
            name="username"
            className="chatbar-username"
            onChange={this.callSetUser}
            value={this.state.currentUserName}
            placeholder="Username"
          />
          <input
            id="chatbar-message"
            name="message"
            className="chatbar-message"
            placeholder="placeholder"
            onChange={this.setMessage}
            value={this.state.message}
          />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
