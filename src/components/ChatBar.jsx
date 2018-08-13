import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      message: ''
    };
  }
  // Controlled input for username
  setUsername = event => this.setState({ currentUsername: event.target.value });
  // Controlled input for message
  setMessage = event => this.setState({ message: event.target.value });
  // Catch form submit
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      //handle username entry
      if (this.state.currentUsername) {
        this.props.setUser(this.state.currentUsername);
        this.props.addMessage(this.state.currentUsername, this.state.message);
      } else {
        // no user entered
        this.props.addMessage(this.props.currentUser.name, this.state.message);
      }
      this.setState({ message: '' });
    }
  };
  // Render Code Below
  render() {
    return (
      <footer>
        <form onKeyPress={this.handleKeyPress} className="chatbar">
          <input
            id="chatbar-username"
            name="username"
            className="chatbar-username"
            onChange={this.setUsername}
            value={this.state.currentUsername} //controlled input
            placeholder="Enter Username (Optional)"
          />
          <input
            id="chatbar-message"
            name="message"
            className="chatbar-message"
            placeholder="Type a message and hit ENTER (just do it...)"
            onChange={this.setMessage}
            value={this.state.message}
          />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
