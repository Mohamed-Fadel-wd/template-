const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");

const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  !quote.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = quote.author);

  quote.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;
  complete();
};

newQuoteBtn.addEventListener("click", () => {
  newQuote();
});

const getQuotes = async () => {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};
const postToLinkedIn = () => {
  const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${quoteText.textContent}&source=${window.location.href}&summary=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(linkedInUrl, "_blank");
};

twitterBtn.addEventListener("click", () => {
  tweetQuote();
});

getQuotes();
