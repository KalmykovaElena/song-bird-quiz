import {CONSTANTS} from "./constants.js";
import {playSound} from "../utils/playSound.js";
import {stopPlayer} from "../audioPlayer/helpers.js";

export const createAnswerList=(array)=>{
   return array.map(el => {
        return `
         <li class="game-board__answers-list-item" id="${el.id}"><span class="item-btn"></span>${el.name}</li>
        `
    }).join('')
}

export const createDescriptionCard = ()=>{
    return `
     <div></div>
    <div class="game-board__description-rules">
      <div class="txt">
        <div class="txt-1">Прослушайте запись</div>
        <div class="txt-2">и</div>
        <div class="txt-3">выберите птицу из списка</div>
     </div>
    <img class="flying-bird" src="assets/pngwing.com (7).png" alt="">
    </div>
    `
}

export const setSuccessAnswer=(itemBtn,questionCard,pointsNumber)=>{
    const levelNumber = localStorage.getItem('levelNumber')
    const questionAudio = CONSTANTS.questionBoard.getElementsByTagName('audio')[0]
    const questionAudioBtn = questionAudio.closest('.player').querySelector('.btn-image')
    let score = localStorage.getItem('score') ? Number(localStorage.getItem('score')) : 0
    let scoreValue = document.querySelector('.game-page__header__score-value')
    let results = []

    itemBtn.classList.add('success')
    itemBtn.parentElement.classList.add('success-item')
    localStorage.setItem('canAnswer', 'false')
    CONSTANTS.levelButton.classList.remove('disabled')
    playSound('./assets/audio/success.mp3')
    questionAudio.currentTime = 0
    stopPlayer(questionAudioBtn,questionAudio)
    CONSTANTS.questionName.textContent = questionCard.name
    CONSTANTS.questionImage.firstElementChild.src = questionCard.image
    score = score + pointsNumber
    scoreValue.innerHTML = score
    localStorage.setItem('score', score)
    CONSTANTS.levelButton.classList.remove('disabled')

    if (levelNumber == CONSTANTS.levels.length - 1) {

        setTimeout(() => {
            showLevelResult(score)
        }, 1000)
        if (!localStorage.getItem('results')) {
            localStorage.setItem('results', JSON.stringify([score]))
        } else {
            results = [...JSON.parse(localStorage.getItem('results')), score]
            localStorage.setItem('results', JSON.stringify(results))
        }
    }
}

function showLevelResult (score)  {
    const modalWindow = document.querySelector('.result-page')
    const content = document.querySelector('.result-page__content')
    const gameScore = document.querySelector('.game-score')

    gameScore.innerHTML = score === 30 ?
        `<div>Поздравляем,Вы набрали максимальный балл!!!</div>`
        : `
    <div>Поздравляем, Вы выиграли!!!</div>
    <div>Ваш счет: <span class="score-value">${score}</span> из <span class="score-value">30</span> возможных</div>
    `
    modalWindow.classList.add('open')
    content.classList.add('open')



}
