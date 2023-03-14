// Get the highscores element from the HTML file
const highscoresList = document.getElementById("highscores");

// Retrieve high scores from localStorage and parse them
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Display the high scores
highScores.forEach((highScore) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${highScore.initials} - ${highScore.score}`;
    highscoresList.appendChild(listItem);
});

// Clear high scores
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("highScores");
    highscoresList.innerHTML = "";
});
