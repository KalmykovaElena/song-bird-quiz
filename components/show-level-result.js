import {startGame} from "../main.js";
import {showGameInformation} from "./show-game-information.js";
import StartLevel from "./start-level.js";
import birdsData from "./birdsData.js";


export const showLevelResult = (score) => {
    const modalWindow = document.querySelector('.result-page')
    const content = document.querySelector('.result-page__content')
    const gameScore = document.querySelector('.game-score')
    const resultButton = document.querySelector('.results-button-res')

    gameScore.innerHTML = score == 30 ?
        `<div>Поздравляем,Вы набрали максимальный балл!!!</div>`
        : `
    <div>Поздравляем, Вы выиграли!!!</div>
    <div>Ваш счет: <span class="score-value">${score}</span> из <span class="score-value">30</span> возможных</div>
    `
    modalWindow.classList.add('open')
    content.classList.add('open')



}
