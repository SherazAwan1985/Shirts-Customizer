// App.js
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes';
import './index.css'; 
function App() {
  return (
    <Router>
      <Routes>
        {routes}
      </Routes>
    </Router>
  );
}

export default App;
