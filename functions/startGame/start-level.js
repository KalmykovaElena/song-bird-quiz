import {mixArray} from "../utils/mix-array.js";
import {getRandomNumber} from "../utils/get-rundom-number.js";
import CreateAudioPlayer from "../audioPlayer/create-audio-player.js";
import handlerAnswer from "./handler-answer.js";
import {CONSTANTS} from "./constants.js";
import {createAnswerList, createDescriptionCard} from "./halpers.js";


function StartLevel(data, levelNumber) {
    let answersArray = mixArray(data[levelNumber])
    let questionImage = document.querySelector('.game-board__question-image')
    let questionCard = answersArray[getRandomNumber(0, answersArray.length - 1)]

    CONSTANTS.levels.forEach(e => e.classList.remove('current'))
    CONSTANTS.levels[levelNumber].classList.add('current')
    CONSTANTS.questionName.textContent = '******'
    questionImage.firstElementChild.src = 'assets/Weaver_Bird_Silhouette.jpg'

    CreateAudioPlayer(questionCard, CONSTANTS.questionBoard, 'game-board__question-sound')
    localStorage.setItem('levelNumber', levelNumber)
    localStorage.setItem('pointsNumber', '5')
    localStorage.setItem('questionCard', JSON.stringify(questionCard))
    localStorage.setItem('answersArray', JSON.stringify(answersArray))
    localStorage.setItem('canAnswer', 'true')
    CONSTANTS.levelButton.classList.add('disabled')
    CONSTANTS.descriptionCard.innerHTML = createDescriptionCard()
    CONSTANTS.answersList.innerHTML =createAnswerList(answersArray)
    CONSTANTS.answersList.addEventListener('click', handlerAnswer)


};


export default StartLevel;
