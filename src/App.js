import React, { useState, useEffect } from 'react';
import 'whatwg-fetch';

import './App.css';
import loading from './loading.gif';

const url = offset =>
  `https://api.giphy.com/v1/gifs/search?api_key=sHtQW9BlzPCIiKKdsF4orVzpJHz1d1zh&q=kawaii%20pastel%20anime&offset=${offset}&limit=100`;

const getRidOfShit = ({ title }) =>
  !title.includes('Borrachas') ||
  !title.includes('japan yuruchara GIF') ||
  !title.includes('zolloc');

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    window
      .fetch(url(parseInt(4899 * Math.random(), 10)))
      .then(res => res.text())
      .then(JSON.parse)
      .then(text => {
        setData(text.data);
      });
  }, []);

  if (data.length === 0) {
    return <img src={loading} alt="loading" />;
  }

  return (
    <React.Fragment>
      <header>kawaii frontpage</header>
      <section>
        {data.filter(getRidOfShit).map(d => {
          if (d.source_post_url || d.source || d.content_url) {
            return (
              <a
                href={d.source_post_url || d.source || d.content_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={d.images.preview_gif.url} alt={d.title} key={d.id} />
              </a>
            );
          }
          return (
            <img src={d.images.preview_gif.url} alt={d.title} key={d.id} />
          );
        })}
      </section>
    </React.Fragment>
  );
};

export default App;
