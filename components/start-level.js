import {mixArray} from "./functions/mix-array.js";
import {getRandomNumber} from "./functions/get-rundom-number.js";
import {showCard} from "./show-card.js";
import CreateAudioPlayer from "./create-audio-player.js";
import {showLevelResult} from "./show-level-result.js";


function StartLevel(data, levelNumber) {
    let results = []
    let pointsNumber = 5
    let score = localStorage.getItem('score') ? Number(localStorage.getItem('score')) : 0
    let scoreValue = document.querySelector('.game-page__header__score-value')
    const levels = document.querySelectorAll('.game-page__navbar-item')
    levels.forEach(e => e.classList.remove('current'))
    levels[levelNumber].classList.add('current')

    let answersArray = mixArray(data[levelNumber])
    let answersList = document.querySelector('.game-board__answers-list')

    let questionBoard = document.querySelector('.game-page__game-board')
    let questionName = document.querySelector('.game-board__question-name')
    questionName.innerHTML = '******'
    let questionImage = document.querySelector('.game-board__question-image')//div
    questionImage.firstElementChild.src = 'assets/Weaver_Bird_Silhouette.jpg'
    let questionCard = answersArray[getRandomNumber(0, answersArray.length - 1)]

    CreateAudioPlayer(questionCard, questionBoard, 'game-board__question-sound')
    const questionAudio = questionBoard.getElementsByTagName('audio')[0]
    let canAnswer = true
    let levelButton = document.querySelector('.game-page__level-button')
    levelButton.classList.add('disabled')
    let descriptionCard = document.querySelector('.game-board__description')
    descriptionCard.innerHTML = `
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

    answersList.innerHTML = answersArray.map(el => {
        return `
         <li class="game-board__answers-list-item" id="${el.id}"><span class="item-btn"></span>${el.name}</li>
        `
    }).join('')
    answersList.addEventListener('click', (e) => {
        let currentId
        let itemBtn
        if (!e.target.firstElementChild) {
            itemBtn = e.target
            currentId = e.target.parentElement
        } else {
            itemBtn = e.target.firstElementChild
            currentId = e.target
        }
        showCard(+currentId.id, answersArray)

        if (+e.target.id === questionCard.id) {
            itemBtn.classList.add('success')
            canAnswer = false
            levelButton.classList.remove('disabled')
            playSound('./assets/audio/success.mp3')
            questionAudio.pause()
            questionAudio.currentTime = 0
            questionName.innerHTML = questionCard.name
            questionImage.firstElementChild.src = questionCard.image
            score = score + pointsNumber
            scoreValue.innerHTML = score
            localStorage.setItem('score', score)
            levelButton.classList.remove('disabled')
            questionCard = 0

            if (levelNumber === levels.length - 1) {

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

        } else if (canAnswer) {
            itemBtn.classList.add('error')
            playSound('./assets/audio/mistake.mp3')
            pointsNumber -= 1

        }
    })

    function playSound(soundObj) {
        let sound = new Audio(soundObj)
        sound.play();
    }


};

export default StartLevel;