import '../css/main.css';
import logo from '../logo.svg';
import React, { useEffect, useState, useRef } from "react";



function App() {

  const [newsData, setNewsData] = useState();

  const [searchData, setSearchData] = useState('BT');
  const [currentInput, setCurrentInput] = useState('');
  //const [apiStatus, setApiStatus] = useState();
  
  const searchedNews = useRef();

  const apiKey = "3e7201adfdf84a0691f916e3488a31d8";//"64462cf79b3d449483ea5f2692e95e60";
  const url = `https://newsapi.org/v2/everything?q=${searchData}&from=2021-04-26&pageSize=10&sortBy=popularity&apiKey=${apiKey}`
  
  const req = new Request(url);

  useEffect(() => {
    fetch(req)
    .then((response) => response.json())
    .then((data) => setNewsData(data)) //console.log(data)) 
    .catch((error) => console.log(error));
  }, [searchData]);

  useEffect(() => {
    searchedNews.current = searchData
  }, []);

  function updateSearch(val){
    
    console.log(val.length, val)
    setCurrentInput(val)
    
    // Prevent API error when input is no value or 'space' 
    if(val.length > 0 && val != ' ') { 
      setSearchData(val)
    }
    
  }
    //Dummy data due to API request limit reached
    const test_title = "Forerunner’s Eurie Kim will share why she invested in Oura on Extra Crunch Live";
    const test_data = `Oxygen and other supplies are unlikely to spare India further catastrophe. In Brazil, 
                  Russia’s Sputnik V vaccine isn’t recommended. Greece eased its Oxygen and other supplies 
                  are unlikely to spare India further catastrophe. In Brazil, Russia’s Sputnik V vaccine isn’t 
                  recommended. Greece eased`;
    const test_publisher = "New York Times";
    const test_url = "https://blog.google/outreach-initiatives/diversity/a-djs-mission-to-tell-asian-american-stories-track-by-track/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+blogspot%2FMKuf+%28The+Keyword+%7C+Official+Google+Blog%29"

  function TestNewsArticle() {
    return (
      <div className="news">
        <h2 className="news_title">{test_title}</h2>
        <span className="news_author">{test_publisher}</span>
        <p className="news_desc">{test_data.replace(/(.{150})..+/, "$1…")}</p>
        <span className="news_url">{test_url}</span>
      </div>
    );
  }



  function NewsArticle({ data }) {
    //console.log("content length = ",data.description)
    return (
      <div className="news">
        <h2 className="news_title">{data.title}</h2>
        <span className="news_publisher">{data.source.name}</span>
        <span className="news_author">{data.author}</span>
        <p className="news_desc">{data.description.replace(/(.{150})..+/, "$1…")}</p>
        <span className="news_url">{data.url}</span>
      </div>
    );
  }
  

  return (
    <div className="App">
      <h1>test</h1>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
       
      </header>

      <form>
        <label>
          <input value={currentInput} onChange={e => updateSearch(e.target.value)}/>
        </label>
      </form>

      {newsData ? newsData.articles.map((newsItem) => (
             <NewsArticle data={newsItem} key={newsItem.url} />
            ))
          : "Loading"}
    </div>
  );
}
export default App;

