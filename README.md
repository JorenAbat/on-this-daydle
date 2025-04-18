# Todaydle

A daily historical event guessing game where players try to guess the year of a significant event that happened on the current date in history.

## How to Play

1. A historical event that occurred on today's date (in a past year) will be displayed
2. You have 6 attempts to guess the correct 4-digit year when this event took place
3. After each guess, you'll receive color-coded feedback:
   - 🟩 Green: Exact year match
   - 🟨 Light Green: Within 10 years
   - 🟧 Yellow: Within 100 years
   - 🟥 Red: Within 1000 years

## Features

- Daily historical events from the [History API](https://history.muffinlabs.com/)
- Color-coded feedback system
- Responsive design
- Keyboard support (Enter key to submit guesses)
- Restart functionality

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- History API for historical events

## How to Run

1. Clone the repository
2. Open `index.html` in your web browser
3. Start guessing!

## Game Rules

- Each guess must be a valid 4-digit year
- You have 6 attempts to guess the correct year
- The game automatically fetches a new event each day
- You can restart the game at any time after winning or losing

## Feedback Colors

- 🟩 Correct: Exact year match
- 🟨 Within 10: Close within 10 years
- 🟧 Within 100: Close within 100 years
- 🟥 Within 1000: Close within 1000 years

## License

This project is open source and available under the MIT License. 