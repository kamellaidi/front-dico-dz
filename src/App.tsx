import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AppNavbar from './components/Navbar';
import Lexicon from './components/Lexicon';

const App: React.FC = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/lexicon" Component={Lexicon} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
};

export default App;
