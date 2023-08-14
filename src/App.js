import './App.css';
import json from './kinopoisk.json'
import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  // const films=json['docs']
  // console.log(films)
  return (
    <div className="App">
<Header />
<Main />
<Footer />
    </div>
  );
}

export default App;
