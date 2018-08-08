import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      messages: [
        {
          id: 11231231212,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 12412412512,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
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
  addMessage(username, content) {
    console.log('Username: ' + username);
    console.log('Message: ' + content);
    let newMessage = {
      username: username,
      content: content,
      id: this.state.messages.length + 1
    };
    console.log('new task ' + newMessage);

    //saves old tasks, copies into new array
    let oldContent = this.state.messages;
    let messages = [...oldContent, newMessage];
    this.setState({ messages: messages });
  }
  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
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
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
