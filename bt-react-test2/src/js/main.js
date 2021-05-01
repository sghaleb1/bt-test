import '../css/main.css';
import logo from '../logo.svg';
import React, { useEffect, useState } from "react";

export default function App() {

  const [newsData, setNewsData] = useState();
  const [searchData, setSearchData] = useState('BT');
  const [currentInput, setCurrentInput] = useState('');

  const pageSize = 10;
  const dateFrom = '2021-04-26';
  const [sortBy, setSortBy] = useState('popularity');

  const apiKey = "3e7201adfdf84a0691f916e3488a31d8";
  const url = `https://newsapi.org/v2/everything?q=${searchData}&from=${dateFrom}&pageSize=${pageSize}&page=1&sortBy=${sortBy}&apiKey=${apiKey}`
  const req = new Request(url);

  // # useEffect hook used to request NewsApi at beginning and when search input onChange.
  useEffect(() => {
    fetch(req)
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.log(error));
  }, [searchData, sortBy]);


  // # News Main - Handle news results and API errors
  function News() {
    if (newsData) {
      console.log('newsData', newsData)
      //If no results found or wrong search input.
      if (newsData.totalResults <= 0 || newsData.code === 'apiKeyMissing' || newsData.code === 'parametersMissing') {
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

  // # News Article - Each article has the chosen layout and css 
  function NewsArticle({ data }) {

    let newsTitle = data.title != null ? data.title.replace(/(.{55})..+/, "$1…") : 'No title available';
    let newsPublisher = data.source.name != null ? data.source.name : 'No publisher name available';
    let newsDesc = data.description != null ? data.description.replace(/(.{150})..+/, "$1…") : 'No description available';
    let newsUrl = data.url != null ? data.url : 'No url available';
    let newsImage = data.urlToImage != null ? data.urlToImage : 'https://i.ibb.co/BB2d5kR/depositphotos-247872612-stock-illustration-no-image-available-icon-vector.jpg';


    return (
      <article className="news">
        <header>
          <h2 className="news-title">{newsTitle}</h2>
        </header>
        <img src={newsImage} alt={data.urlToImage}></img>
        <span className="news-publisher">{newsPublisher}</span>
        <div className="news-content">
          <p>{newsDesc}</p>
        </div>
        <footer>
        <a href={newsUrl} className="news-url">{newsUrl}</a> 
        </footer>

      </article >
    );
  }

  function SortByDropDown() {
    return (
      <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
        <option value="relevancy">Relevancy</option>
        <option value="popularity">Popularity</option>
        <option value="publishedAt">Newest</option>
      </select>
    )
  }

  // # Main React component 
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
            {/* Search section */}
            <div className="search-container">
              <input className="search-input" value={currentInput} onChange={e => {
                setCurrentInput(e.target.value);
                setSearchData(e.target.value);
              }} placeholder="Search..." />
              <SortByDropDown className="search-drop-down" />
            </div>

              <div className="news-holder">
                <News />
              </div>
            
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

