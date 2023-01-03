// Get Quotes From API
const quoteContainer = document.getElementById('quote-container');
const verseText = document.getElementById('quote');
const verseAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newVerseBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const quoteMark = document.getElementsByClassName('quote-mark');

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(verses){
    showLoadingSpinner();
    // For the local verses
    //const verse = verses[Math.floor(Math.random() * verses.length)];
    const verse = verses[Math.floor(Math.random() * verses.length)];
    //check verse length to determine the styling
    if(verse.text.length > 120){
        verseText.classList.add('long-quote');
        const markArr = Array.from(quoteMark);
        markArr.forEach(mark => mark.classList.add('long-quote-mark'));
    } else {
        verseText.classList.remove('long-quote');
        const markArr = Array.from(quoteMark);
        markArr.forEach(mark => mark.classList.remove('long-quote-mark'));
    }
    verseText.textContent = verse.text;
    verseAuthor.textContent = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
    removeLoadingSpinner();
}

async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://bible-api.com/romans+12:1-2,5-7,9,13:1-9&10';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(apiQuotes.verses);
        return true;
    }catch(error){
        // Catch Error Here
        getQuotes();
        console.log('whoops, no quote', error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${verseText.textContent} - ${verseAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}
//Event Listeners
newVerseBtn.addEventListener('click', function(){newQuote(apiQuotes.verses)});

// console.log(apiQuotes);
twitterBtn.addEventListener('click', tweetQuote);

//ON Load
getQuotes();

//For local verses
// newQuote(localVerses);
