import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import File from './components/File'

import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<File />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
