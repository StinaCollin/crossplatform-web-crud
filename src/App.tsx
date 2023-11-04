import React, { useState } from 'react';
import './App.css';
import { CreateUser } from './components/CreateUser';
import { UserList } from './components/UserList';

function App() {
  const [showUserList, setShowUserList] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button style={{ backgroundColor: showUserList ? '#3c425c' : '#f2f2f2' }} className="TabButton" onClick={() => setShowUserList(false)}>Skapa user</button>
          <button style={{ backgroundColor: showUserList ? '#f2f2f2' : '#3c425c' }}  className="TabButton" onClick={() => setShowUserList(true)}>Lista users</button>
          {showUserList ? <UserList /> : <CreateUser />}
        </div> 
      </header>
    </div>
  );
}

export default App;
