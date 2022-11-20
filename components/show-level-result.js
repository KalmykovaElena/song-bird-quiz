import {startGame} from "../main.js";
import {controlResultsButton} from "./functions/control-results-button.js";


export const showResults = (score) => {
    const modalWindow= document.querySelector('.result-page')
    const content= document.querySelector('.result-page__content')
    const restart =document.querySelector('.restart-button')
    const gameScore =document.querySelector('.game-score')
    const resultList =document.querySelector('.result-list-items')
    const resultButton =document.querySelector('.results-button')
    const results = JSON.parse(localStorage.getItem('results'))

    console.log(score)
gameScore.innerHTML= score==30?
    `<div>Поздравляем,Вы набрали максимальный балл!!!</div>`
    : `
    <div>Поздравляем, Вы выиграли!!!</div>
    <div>Ваш счет: <span class="score-value">${score}</span> из <span class="score-value">30</span> возможных</div>
    `
    modalWindow.classList.add('open')
    content.classList.add('open')
    restart.addEventListener('click',()=>{
        startGame()
        modalWindow.classList.remove('open')
        content.classList.remove('open')
    })
    let resultItems=results ? results.map((e,i)=>{
        return `
        <li class="score-item">${i+1} - счет : <span>${e}</span></li>
        `
    }).join(''):" "

    resultButton.addEventListener('click',()=>{

        resultList.innerHTML=resultItems

        resultList.parentNode.style.transform='translateX(0)'
    })
    controlResultsButton(resultList.parentElement)

}