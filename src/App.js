import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';
import BookedRequests from './layouts/BookedRequests'

function App() {
  return (
    <div className="App">
      <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              AppointMe
            </Typography>
          </Toolbar>
        </AppBar>
      <header className="App-header">
        <br />
        <p>
           My Booked Requests
        </p>
        <BookedRequests />
      </header>
    </div>
  );
}

export default App;
