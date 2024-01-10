// List of words for the game
const words = ['javascript', 'hangman', 'developer', 'computer', 'coding'];

// Select a random word from the list
let selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

// Initialize an array to store the guessed letters
let guessedLetters = [];

let wrongGuessCount = 0;


const wordHints = {
    'javascript': 'A popular programming language for web development.',
    'hangman': 'The name of this game.',
    'developer': 'Someone who writes code.',
    'computer': 'A device that processes data.',
    'coding': 'The act of writing code.'
};


// Display placeholders for the word
function displayWord() {
    let wordHolder = '';
    for (let char of selectedWord) {
        if (guessedLetters.includes(char)) {
            wordHolder += char + ' ';
        } else {
            wordHolder += '_ ';
        }
    }
    document.getElementById('word-container').textContent = wordHolder.trim();
}


// Display letters for selection
function displayLetters() {
    let lettersContainer = document.getElementById('letters');
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        let button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter');
        button.addEventListener('click', function () {
            checkLetter(letter);
            this.disabled = true;
        });
        lettersContainer.appendChild(button);
    }
}

// Check if the guessed letter is correct
function checkLetter(letter) {
    letter = letter.toLowerCase(); // Convert to lowercase
    if (!selectedWord.includes(letter)) {
        wrongGuessCount++;
        if (wrongGuessCount >= 3) {
            alert('Game Over! You lost.');
            resetGame();
            return;
        }
    }
    guessedLetters.push(letter);
    displayWord();
    if (isGameWon()) {
        alert('Congratulations! You won!');
        resetGame();
    }
}


// Check if all letters in the word have been guessed
function isGameWon() {
    for (let char of selectedWord) {
        if (!guessedLetters.includes(char)) {
            return false;
        }
    }
    return true;
}

// Reset the game
function nextGame() {
    guessedLetters = [];
    selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    wrongGuessCount = 0; // Reset wrong guess count
    displayWord();
    displayHint(); 
    resetLetters();
}

// function resetGame() {
//     guessedLetters = [];
//     wrongGuessCount = 0; // Reset wrong guess count
//     displayWord();
//     displayHint(); 
//     resetLetters();
// }


// Reset letter buttons
function resetLetters() {
    let lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';
    displayLetters();
}

function displayHint() {
    document.getElementById('hint-container').textContent = `Hint: ${wordHints[selectedWord]}`;
}

document.getElementById('next-btn').addEventListener('click', function () {
    nextGame(); // Reset the game to display the next word
});


// document.getElementById('reset-btn').addEventListener('click', function () {
//     resetGame()
// });

// Start the game
displayWord();
displayLetters();
displayHint();

