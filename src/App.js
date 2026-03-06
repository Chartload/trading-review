import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import LiveTradingReviews from './components/LiveTradingReviews';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <LiveTradingReviews />
      </div>
    </HelmetProvider>
  );
}

export default App;