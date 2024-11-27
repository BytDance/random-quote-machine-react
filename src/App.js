
import React, { useState,useEffect } from 'react';
import './App.scss';

const xIcon = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";

function App() {

    const [quote, setQ] = useState("Welcome!");
    const [author, setA] = useState("");
    const [quotesList, setQList] = useState(null);
    const [pColor, setPColor] = useState("grey");

    let quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    function generateRandomNumber(x) { return (Math.floor(Math.random() * (x))); }

    function randomColor() {
        const r = generateRandomNumber(255);
        const g = generateRandomNumber(255);
        const b = generateRandomNumber(255);

        return `rgb(${r}, ${g},${b})`;
    }


    const UpdateQ = async () => {
        const res = await fetch(quotesURL);
        const json = await res.json();
        setQList(json.quotes);
    }

    useEffect(() => {
        UpdateQ();
    }, [quotesURL]);



    function NextQ() {
        const num = generateRandomNumber(quotesList.length);
        let current = quotesList[num];
        setA(current.author);
        setQ(current.quote);
        setPColor(randomColor());
    }


    return (
        
        <div className="App">
            <header className="App-header" style={{ backgroundColor: pColor }}>
                <div id="quote-box" >
                    <p id="text" style={{color: pColor}}>{quote}</p>
                    <p id="author" style={{ color: pColor }}> {author}</p>
                    
                    <a id="tweet-quote" href={encodeURI(`https://twitter.com/intent/tweet?text= ${quote}  - by  ${author}`)} >

                        <svg id="xIconId" >
                            <path d={xIcon} stroke={pColor} fill="none" />
                        </svg>
                    </a>
                    
                <button id="new-quote" style={{ backgroundColor: pColor }} onClick={NextQ} >New Quote</button>
                    

                </div >
            </header>

        </div >
        );

}

export default App;
