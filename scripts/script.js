let secretYear = ""; // We will get the year from the API
let currentGuess = 0;
let eventDescription = ""; // Store event description to show in the UI

// Fetch a random event based on today's date
async function fetchEvent() {
  const date = new Date();
  const month = date.getMonth() + 1; // Months are 0-indexed in JS, so add 1
  const day = date.getDate();

  try {
    const response = await fetch(
      `https://history.muffinlabs.com/date/${month}/${day}`
    );
    const data = await response.json();
    const randomEvent =
      data.data.Events[Math.floor(Math.random() * data.data.Events.length)];

    secretYear = randomEvent.year.toString(); // Set the year we need to guess
    eventDescription = randomEvent.text; // Get the event description

    // Display the event description at the bottom
    document.getElementById(
      "event-description"
    ).textContent = `Event: ${eventDescription}`;
  } catch (error) {
    console.error("Error fetching the event:", error);
    secretYear = "1987"; // Fallback if API fails
    eventDescription = "This is a fallback event due to API error.";
    document.getElementById("event-description").textContent =
      "Event: (API Error)";
  }
}

// Create the grid for guesses
function createGrid() {
  const board = document.getElementById("game-board");
  for (let i = 0; i < 24; i++) {
    const div = document.createElement("div");
    board.appendChild(div);
  }
}

// Handle the user's guess
function handleGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value;
  if (guess.length !== 4 || isNaN(guess)) return;

  let guessArray = Array.from(guess);
  let board = document.getElementById("game-board").children;

  for (let i = 0; i < 4; i++) {
    let box = board[currentGuess * 4 + i];
    let num = guessArray[i];

    // Feedback for the guess
    if (num === secretYear[i]) {
      box.classList.add("correct");
    } else if (secretYear.includes(num)) {
      box.classList.add("present");
    } else {
      box.classList.add("absent");
    }

    // Reveal the number after a small delay
    setTimeout(() => {
      box.classList.add("reveal");
      box.textContent = num;
    }, i * 200);
  }

  // Check if the guess is correct
  if (guess === secretYear) {
    showModal("You won! Congratulations!");
  } else if (currentGuess === 5) {
    showModal("Game Over! The correct year was " + secretYear);
  }

  currentGuess++;
  guessInput.value = "";
}

// Display modal with result
function showModal(message) {
  const modal = document.getElementById("modal");
  const resultMessage = document.getElementById("result-message");
  resultMessage.textContent = message;
  modal.style.display = "flex";
}

// Reset the game
function resetGame() {
  secretYear = "";
  currentGuess = 0;
  document.getElementById("modal").style.display = "none";

  const board = document.getElementById("game-board");
  Array.from(board.children).forEach((div) => {
    div.textContent = "";
    div.classList.remove("correct", "present", "absent", "reveal");
  });

  fetchEvent(); // Fetch a new event for the next round
}

// Enable Enter key for guessing
document
  .getElementById("guess-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleGuess();
    }
  });

document.getElementById("guess-button").addEventListener("click", handleGuess);

// Initialize the game
createGrid();
fetchEvent(); // Fetch event when the page loads
