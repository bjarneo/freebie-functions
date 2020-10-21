import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [urlResponse, setUrlResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch('/.netlify/functions/url', {
      method: 'POST',
      body: JSON.stringify({ url })
    });

    const json = await data.json();

    setUrlResponse(json);
  }

  return (
    <div className="App">
      <section className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={handleSubmit} className="form">
          <label>
            <input
              className="input"
              type="text"
              value={url}
              placeholder="Insert short url"
              onChange={e => setUrl(e.target.value)}
            />
          </label>

          <input className="submit" type="submit" value="Submit" />
        </form>

        {urlResponse && 
          <pre>
            {JSON.stringify(urlResponse, null, 2)}
          </pre>
        }
      </section>
    </div>
  );
}

export default App;
