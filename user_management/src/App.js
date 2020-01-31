import React from 'react';
import './App.css';
import Routing from './Route/Routing';
import Profile from './Components/JsFiles/Profile';
import DashboardComponents from './Components/JsFiles/DashboardComponents';
import Edituserdetails from './Components/JsFiles/Edituserdetails';
import Userlist from './Components/JsFiles/Userlist';

function App() {
  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
