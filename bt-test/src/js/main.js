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

  function NewsArticle({ data }) {
    console.log("content length = ",data.description)
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

