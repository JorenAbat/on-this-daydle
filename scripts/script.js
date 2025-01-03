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

  // Calculate the difference between guess and secret year
  let difference = Math.abs(secretYear - guess);

  for (let i = 0; i < 4; i++) {
    let box = board[currentGuess * 4 + i];
    let num = guessArray[i];

    // Apply proximity-based color feedback
    if (difference === 0) {
      box.classList.add("correct"); // Exact match
    } else if (difference <= 10) {
      box.classList.add("close-10"); // Close within 10 years
    } else if (difference <= 100) {
      box.classList.add("close-100"); // Close within 100 years
    } else if (difference <= 1000) {
      box.classList.add("close-1000"); // Close within 1000 years
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
    showResetButton(); // Show reset button
  } else if (currentGuess === 5) {
    showModal("Game Over! The correct year was " + secretYear);
    showResetButton(); // Show reset button
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

// Close the modal when clicking the X button
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Show reset button when game is over (win or loss)
function showResetButton() {
  const resetButton = document.getElementById("restart-button");
  resetButton.style.display = "block"; // Show the reset button
}

// Reset the game
function resetGame() {
  secretYear = "";
  currentGuess = 0;
  document.getElementById("modal").style.display = "none";

  const board = document.getElementById("game-board");
  Array.from(board.children).forEach((div) => {
    div.textContent = "";
    div.classList.remove(
      "correct",
      "close-1000",
      "close-100",
      "close-10",
      "reveal"
    );
  });

  fetchEvent(); // Fetch a new event for the next round

  // Hide the reset button after restarting the game
  document.getElementById("restart-button").style.display = "none";
}

// Enable Enter key for guessing
document.getElementById("guess-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleGuess();
  }
});

// Event listener for closing the modal with the X button
document.getElementById("modal-close").addEventListener("click", closeModal);

// Event listener for restarting the game (if needed)
document.getElementById("restart-button").addEventListener("click", resetGame);

// Initialize the game
fetchEvent();
createGrid();
