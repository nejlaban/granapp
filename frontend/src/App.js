import React from 'react';
import logo from './logo.svg';
import './App.css';

/* Import custom components */
import WelcomeBar from './components/WelcomeBar';
import BuyItem from './components/BuyItem';

const App = () => {
    return (
        <div className="App">
            {/* Use custom components, and send them custom `props` - values */}
            <WelcomeBar appName='GranApp' />
            <BuyItem product='bread' inStock={20} />
        </div>
    );
}

export default App;
