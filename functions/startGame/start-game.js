import StartLevel from "./start-level.js";
import birdsData from "../utils/birdsData.js";

export function startGame() {
    let scoreValue = document.querySelector('.game-page__header__score-value')
    let levelNumber = 0
    const levelButton = document.querySelector('.game-page__level-button')

    scoreValue.innerHTML = '0'
    delete localStorage.score
    StartLevel(birdsData, levelNumber)

    levelButton.addEventListener('click', function () {
        if (!this.classList.contains('disabled') && levelNumber < 5) {
            levelNumber++
            StartLevel(birdsData, levelNumber)
            this.classList.add('disabled')
        }
    })
}
