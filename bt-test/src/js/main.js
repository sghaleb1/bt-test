import '../css/main.css';
import logo from '../logo.svg';
import React, { useEffect, useState } from "react";

function App() {

  const [newsData, setNewsData] = useState();
  const [searchData, setSearchData] = useState('BT');
  const [currentInput, setCurrentInput] = useState('');

  const pageSize = 10;
  const dateFrom = '2021-04-26';

  const proxyUrl = "https://cors-anywhere.herokuapp.com/"

  const apiKey = "3e7201adfdf84a0691f916e3488a31d8";
  const url = `${proxyUrl}https://newsapi.org/v2/everything?q=${searchData}&from=${dateFrom}&pageSize=${pageSize}&sortBy=popularity&apiKey=${apiKey}`
  const req = new Request(url);

  // ####################################################
  // useEffect hook used to request NewsApi at beginning and when search input onChange.
  // ####################################################
  useEffect(() => {
    fetch(req)
      .then((response) => response.json())
      .then((data) => setNewsData(data)) 
      .catch((error) => console.log(error));
  }, [searchData]);
  
  // ####################################################
  // Only request newsApi only for correct input values, else error occurs.
  // It was found that an error occurs when input is no value or 'space' 
  // ####################################################
  function updateSearch(val) {
    setCurrentInput(val)
    if (val.length > 0 && val !== ' ') {
      setSearchData(val)
    }
  }

  // ####################################################
  // News Article - Each article is the chosen layout and css 
  // ####################################################
  function NewsArticle({ data }) {
    return (
      <article className="news">
        <header>
          <h2 className="news-title">{data.title}</h2>
        </header>
        <span className="news-publisher">{data.source.name}</span>
        <div className="news-content">
          <p>{data.description.replace(/(.{150})..+/, "$1…")}</p>
        </div>
        <a href={data.url} className="news-url">{data.url}</a>
      </article >
    );
  }


  return (
    <div className="main-app">
      <header className="app-header">
        <div className="app-nav">
          <a href="https://www.bt.com/"><img src={logo} className="app-logo" alt="logo" /></a>
        </div>
      </header>

      <div className="container">
        <h1 className="container-header">BT React Code Test - by Shahab Ghaleb - 27/04/21</h1>

        <article className="all-news-container">
          <div className="all-news">
            <input className="search-input" value={currentInput} onChange={e => updateSearch(e.target.value)} placeholder="Search..." />
            {/* Display newsApi if response success, else return 'Loading...' */}
            {newsData ? newsData.articles.map((newsItem) => (
              <NewsArticle data={newsItem} key={newsItem.url} />
            ))
              : <div className="initial-loading">Loading...</div>}

          </div>
        </article>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          Footer - News article search
        </div>
      </footer>
    </div>
  );
}
export default App;

