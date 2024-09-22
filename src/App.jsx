import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TypingRace from './components/TypingRace'; // Import the TypingRace component
import './appStyles.css'; // Make sure this line is included to import your styles

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <div className="container">
              <div className="landing-content">
                <h1 className="landing-title">TypeMore</h1>
                <p className="landing-description">
                  Sharpen your typing skills and race against time or <s>other players</s>.
                </p>
                <div className="button-container">
                  <Link to="/practice">
                    <button className="main-button">Start Practice</button>
                  </Link>
                  <button className="main-button" onClick={() => alert('Multiplayer coming soon!')}>Multiplayer</button>
                </div>
                <footer className="footer">
                  <p>GitHub: <a href="https://github.com/b9na/TypeMore" target="_blank" rel="noopener noreferrer">b9na/TypeMore</a></p>
                </footer>
              </div>
            </div>
          } />
          <Route path="/practice" element={<TypingRace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
