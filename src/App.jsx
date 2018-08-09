import React, { Component } from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousUser: { name: '' },
      currentUser: { name: 'Default' },
      messages: [] //empty for initialization
    };
    this.addMessage = this.addMessage.bind(this);
    this._handleSocketMessage = this._handleSocketMessage.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    // Setup WebSocket Client
    this.socket = new WebSocket('ws://localhost:3001');
    // Add Event Listener for Open Connection
    this.socket.addEventListener('open', event => {
      console.log('connection opened with websocket server');
    });
    this.socket.onmessage = this._handleSocketMessage;
  }
  setUser(newUser) {
    this.setState(
      { previousUser: { name: this.state.currentUser.name } },
      () => {
        this.setState({ currentUser: { name: newUser } }, () => {
          let userChanged = {
            type: 'userChanged',
            content: {
              previousUser: this.state.previousUser.name,
              currentUser: newUser
            }
          };
          this.socket.send(JSON.stringify(userChanged));
        });
      }
    );
  }
  addMessage(username, content) {
    console.log('Username: ' + username);
    console.log('Message: ' + content);
    let newMessage = {
      type: 'newMessage',
      content: {
        username: username,
        content: content,
        id: ''
      }
    };
    this.socket.send(JSON.stringify(newMessage));
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
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
  _handleSocketMessage(message) {
    console.log('recieved the following from WebSocketServer:', message.data);
    let messages = [...this.state.messages, JSON.parse(message.data)];
    console.log(this.state.messages);
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({ messages }, () => {
      console.log(this.state.messages);
    });
  }
}
export default App;
