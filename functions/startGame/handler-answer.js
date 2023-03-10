import {showCard} from "../show-card.js";
import {playSound} from "../utils/playSound.js";
import {setSuccessAnswer} from "./halpers.js";

const handlerAnswer = (event) => {
        const currentItem = event.target
        const questionCard = JSON.parse(localStorage.getItem('questionCard'))
        const answersArray = JSON.parse(localStorage.getItem('answersArray'))
        let canAnswer = JSON.parse(localStorage.getItem('canAnswer'))
        let pointsNumber = Number(localStorage.getItem('pointsNumber'))
        let currentId
        let itemBtn

        if (!currentItem.firstElementChild) {
            itemBtn = currentItem
            currentId = currentItem.parentElement
        } else {
            itemBtn = currentItem.firstElementChild
            currentId = currentItem
        }

        showCard(+currentId.id, answersArray)

        if (+currentItem.id === questionCard.id && canAnswer) {
            setSuccessAnswer(itemBtn,questionCard,pointsNumber)

        } else if (canAnswer) {
            if (!itemBtn.classList.contains('error')) {
                itemBtn.classList.add('error')
                playSound('./assets/audio/mistake.mp3')
                pointsNumber -= 1
                localStorage.setItem('pointsNumber',`${pointsNumber}`)
            }
        }
    }
;

export default handlerAnswer;
