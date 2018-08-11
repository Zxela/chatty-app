import React, { Component } from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousUser: { name: '' },
      currentUser: { name: 'Anonymous' },
      messages: [],
      numOfUsers: 0
    };
  }
  componentDidMount() {
    // Setup WebSocket Client
    this.socket = new WebSocket('ws://localhost:3001');
    // Add Event Listener for Open Connection
    this.socket.addEventListener('open', event => {
      console.log('connection opened with websocket server');
    });
    // on recieving message from socket server, call this._HandleSocketMessage
    this.socket.onmessage = this._handleSocketMessage;
  }
  setUser = newUser => {
    this.setState(
      { previousUser: { name: this.state.currentUser.name } },
      () => {
        this.setState({ currentUser: { name: newUser } }, () => {
          let userChanged = {
            type: 'userChanged',
            content: {
              previousUser: this.state.previousUser.name,
              currentUser: newUser || this.state.previousUser.name
            }
          };
          if (this.state.previousUser.name !== newUser)
            return this.socket.send(JSON.stringify(userChanged));
        });
      }
    );
  };
  addMessage = (username, content) => {
    if (!content) {
      console.log('no content');
    } else {
      console.log('Username: ' + username);
      console.log('Message: ' + content);
      let newMessage = {
        type: 'newMessage',
        content: {
          username: username,
          content: content
        }
      };
      this.socket.send(JSON.stringify(newMessage));
    }
  };

  // Render Main App Component
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <div className="navbar-users-online">
            Users Online: {this.state.numOfUsers}
          </div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          setUser={this.setUser}
        />
      </div>
    );
  }
  // Handle Messages From SocketServer
  _handleSocketMessage = message => {
    let messageData = JSON.parse(message.data);
    switch (messageData.type) {
      case 'newMessage':
        let messages = [...this.state.messages, messageData];
        // Update the state of the app component.
        this.setState({ messages }, () => {
          console.log(this.state.messages);
        });
        break;
      case 'userChanged':
        let userMessages = [
          ...this.state.messages,
          {
            content: `${messageData.previousUser} is now ${messageData.newUser}`
          }
        ];
        // Update messages to include a system 'userChanged' message
        this.setState({ messages: userMessages });
        break;
      case 'numUsers':
        // Update the number of users online
        this.setState({ numOfUsers: messageData.content });
        break;
      default:
        console.log(`invalid message type ${message}`);
    }
  };
}
export default App;
