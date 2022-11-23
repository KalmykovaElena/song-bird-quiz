import birdsData from './components/birdsData.js'
import CreateAudioPlayer from "./components/create-audio-player.js";
import StartLevel from "./components/start-level.js";
import {showGameInformation} from "./components/show-game-information.js";
import {showSlider} from "./components/show-slider.js";

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
restart.addEventListener('click', ()=>{
    document.querySelector('.result-page').classList.remove('open')
    document.querySelector('.result-page__content').classList.remove('open')
    startGame()
})
resultButton.addEventListener('click', () => {
    showGameInformation('finish-game-results')
})

export function startGame() {
    console.log('startGame')
    let scoreValue = document.querySelector('.game-page__header__score-value')
    scoreValue.innerHTML = '0'
    let levelNumber = 0
    delete localStorage.score
    const levelButton = document.querySelector('.game-page__level-button')
    StartLevel(birdsData, levelNumber)
    levelButton.addEventListener('click', function () {
        if (!this.classList.contains('disabled') && levelNumber < 5) {
            levelNumber++
            StartLevel(birdsData, levelNumber)
            this.classList.add('disabled')
        }
    })
}



