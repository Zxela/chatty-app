import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      message: ''
    };
  }

  callSetUser = event => this.setState({ currentUsername: event.target.value });

  setMessage = event => this.setState({ message: event.target.value });

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(this.state.message); //log to show message
      //handle no username entered
      if (this.state.currentUsername) {
        this.props.setUser(this.state.currentUsername);
        this.props.addMessage(this.state.currentUsername, this.state.message);
      } else {
        this.props.addMessage(this.props.currentUser.name, this.state.message);
      }
      this.setState({ message: '' });
    }
  };

  render() {
    return (
      <footer>
        <form onKeyPress={this.handleKeyPress} className="chatbar">
          <input
            id="chatbar-username"
            name="username"
            className="chatbar-username"
            onChange={this.callSetUser}
            value={this.state.currentUsername}
            placeholder="Enter Username (Optional)"
          />
          <input
            id="chatbar-message"
            name="message"
            className="chatbar-message"
            placeholder="This is where your message goes!"
            onChange={this.setMessage}
            value={this.state.message}
          />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
