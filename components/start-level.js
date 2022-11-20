import {mixArray} from "./functions/mix-array.js";
import {getRandomNumber} from "./functions/get-rundom-number.js";
import {showCard} from "./functions/show-card.js";
import CreateAudioPlayer from "./create-audio-player.js";


function StartLevel(data, levelNumber) {
    const levels = document.querySelectorAll('.game-page__navbar-item')
    levels[levelNumber].classList.add('current')
    let answersArray = mixArray(data[levelNumber])
    let answersList = document.querySelector('.game-board__answers-list')
    let questionName = document.querySelector('.game-board__question-name')
    questionName.innerHTML='******'
    let questionImage = document.querySelector('.game-board__question-image')//div
    questionImage.firstElementChild.src = '../assets/Weaver_Bird_Silhouette.jpg'
    let questionCard = answersArray[getRandomNumber(0, answersArray.length - 1)]
    console.log(questionCard)
    console.log(questionCard.id)
    CreateAudioPlayer(questionCard, 'game-board__question-sound')
    let canAnswer=true
    let levelButton = document.querySelector('.game-page__level-button')
    levelButton.classList.add('disabled')
    let descriptionCard = document.querySelector('.game-board__description')
    descriptionCard.innerHTML = `
<div></div>
    <div class="game-board__description-rules">
                            <div>Послушайте песню</div>
                            <div>Выберите птицу из списка</div>
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

        if(!e.target.firstElementChild){
            itemBtn=e.target
            currentId=e.target.parentElement
        }else{
            itemBtn=e.target.firstElementChild
            currentId=e.target
        }
        showCard(+currentId.id, answersArray)

        if(+e.target.id===questionCard.id){
            itemBtn.classList.add('success')
            canAnswer=false
            levelButton.classList.remove('disabled')
            playSound('../assets/audio/success.mp3')
            questionName.innerHTML=questionCard.name
            questionImage.firstElementChild.src =questionCard.image
        }else if(canAnswer){
            itemBtn.classList.add('error')
            playSound('../assets/audio/mistake.mp3')
        }
    })

    function playSound(soundObj) {
        let sound = new Audio(soundObj)
            sound.play();
    }
};

export default StartLevel;