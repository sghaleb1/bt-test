import '../css/main.css';
import logo from '../logo.svg';
import React, { useEffect, useState } from "react";

function App() {

  const [newsData, setNewsData] = useState();
  const [searchData, setSearchData] = useState('BT');
  const [currentInput, setCurrentInput] = useState('');

  const pageSize = 10;
  const dateFrom = '2021-04-26';
  const sortBy = 'popularity';

  const apiKey = "64462cf79b3d449483ea5f2692e95e60";
  const url = `https://newsapi.org/v2/everything?q=${searchData}&from=${dateFrom}&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${apiKey}`
  const req = new Request(url);

  // useEffect hook used to request NewsApi at beginning and when search input onChange.
  useEffect(() => {
    fetch(req)
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.log(error));
  }, [searchData]);


  // News Main - Handle news results and API errors
  function News() {
    if (newsData) {
      //If no results found or wrong search input.
      if (newsData.totalResults <= 0 || newsData.code === 'apiKeyMissing') {
        return <div className="request-response">No results found.</div>

        //If API request limit reached
      } else if (newsData.code === 'rateLimited') {
        return <div className="request-response">
          You have made too many requests recently.<br />Please try again later.</div>
      }

      //If API request success
      return (newsData.articles.map((newsItem) => (
        <NewsArticle data={newsItem} key={newsItem.url} />
      ))
      );

      //Initial component render, where data=undefined.
    } else {
      return <div className="request-response">Loading...</div>
    }
  }

  // News Article - Each article has the chosen layout and css 
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

  // Main React component 
  return (
    <div className="main-app">

      {/* Header */}
      <header className="app-header">
        <div className="app-nav">
          <a href="https://www.bt.com/"><img src={logo} className="app-logo" alt="logo" /></a>
        </div>
      </header>

      {/* Main Body */}
      <div className="container">
        <h1 className="container-header">BT React Code Test - by Shahab Ghaleb - 28/04/21</h1>
        <article className="all-news-container">
          <div className="all-news">
            <input className="search-input" value={currentInput} onChange={e => {
              setCurrentInput(e.target.value);
              setSearchData(e.target.value);
            }} placeholder="Search..." />
            <News />
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          Footer - News article search
        </div>
      </footer>

    </div>
  );
}
export default App;

