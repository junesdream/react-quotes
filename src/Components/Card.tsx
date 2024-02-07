import React, { useEffect, useState } from 'react'
import "./Card.css"

interface QuoteTypes {
    content: string;
    author: string;
}

const Card = () => {

 const [randQuotes, setRandQuotes] = useState<QuoteTypes[]>([]);
 const [loading, setLoading] = useState(false);
    

  useEffect (() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async() => {
    try{
      const response = await fetch("https://api.quotable.io/quotes/random");
      const quotes = await response.json();
      setRandQuotes(quotes)
      setLoading(true)
    } catch {
        console.error("Something went wrong")
    }
  };

  return (
		<>
			<div className="container">
				{!loading ? (
					<div className="loading-spinner">Loading</div>
				) : (
					<h2>Daily Quotale</h2>
				)}

				{randQuotes.map((quote, index) => (
					<span key={index}>
						<p>{quote.content}</p>
						<h4>- {quote.author}</h4>
					</span>
				))}
			</div>

			<button onClick={() => window.location.reload()}>
				Get new quote
			</button>
		</>
  );
}

export default Card