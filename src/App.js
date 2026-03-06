import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AITradingReviews from './components/AITradingReviews';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <AITradingReviews />
      </div>
    </HelmetProvider>
  );
}

export default App;
