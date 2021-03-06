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
              name="url"
              placeholder="Reverse URLs"
              onChange={e => setUrl(e.target.value)}
            />
          </label>

          <input className="submit" type="submit" value="Submit" />
        </form>

        {urlResponse && 
          <a className="link" href={urlResponse?.url || '#'}>{urlResponse?.url}</a>
        }
      </section>
    </div>
  );
}

export default App;
