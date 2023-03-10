import birdsData from './functions/utils/birdsData.js'
import {showGameInformation} from "./functions/show-game-information.js";
import {showSlider} from "./functions/slider/show-slider.js";
import {startGame} from "./functions/startGame/start-game.js";

const mainPageBack = document.querySelector('.game-page__header-toMain')
const restart = document.querySelector('.restart-button')
const resultButton = document.querySelector('.results-button-res')
const gameMenu = document.querySelector('.start-page-menu')

gameMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains("results")) {
        gameMenu.firstElementChild.style.opacity = '0'
        showGameInformation('start-page-results')
    } else if (e.target.classList.contains("info")) {
        let info = 'Перед Вами музыкальная викторина, предлагающая определить птицу по ее пению'
        gameMenu.firstElementChild.style.opacity = '0'
        showGameInformation('start-page-results', info)
    } else if (e.target.classList.contains("start")) {
        e.stopPropagation()
        document.querySelector('.start-page').style.transform = 'translateY(-100%)'
        document.querySelector('.wrapper-game-page').style.transform = 'translateY(-100%)'
    } else if (e.target.classList.contains("main-start")) {
        e.stopPropagation()
        console.log(2222)
        document.querySelector('.start-page').style.transform = 'translateY(-100%)'
        document.querySelector('.wrapper-game-page').style.transform = 'translateY(-100%)'
        startGame()
    } else if (e.target.classList.contains('birds-gallery')) {
        showSlider(birdsData)
    }

})

mainPageBack.addEventListener('click', () => {
    document.querySelector('.start-page').style.transform = 'translateY(0)'
    document.querySelector('.wrapper-game-page').style.transform = 'translateY(0)'
})

restart.addEventListener('click', () => {
    document.querySelector('.result-page').classList.remove('open')
    document.querySelector('.result-page__content').classList.remove('open')
    startGame()
})

resultButton.addEventListener('click', () => {
    showGameInformation('finish-game-results')
})





