import {createCard} from "./show-card.js";
import CreateAudioPlayer from "./create-audio-player.js";
import createAudioPlayer from "./create-audio-player.js";

export const showSlider = (data) => {
    let position = '0,0'
    let nextPosition = '0,1'
    console.log(position)
    let prevPosition = '5,5'
    let wrapperSlider = document.querySelector('.start-page-wrapper')

    let slider = document.createElement('div')
    slider.classList.add('slider')
    slider.style.opacity = '0'
    slider.innerHTML = `
<div class="prev-arrow arrow"><img src="assets/left-arrow.png"/></div>
<div class="slider-container">
    <div class="prev-slider slide"></div>
    <div class="current-slider slide"></div>
    <div class="next-slider slide"></div>
    </div>
    <div class="next-arrow arrow"><img src="assets/left-arrow.png" alt=""></div>
    <div class="close-slider"><img src="assets/close-slider.png"</div>
    `
    wrapperSlider.append(slider)
    setTimeout(() => {
        slider.style.opacity = '1'
    }, 0)

    let prevSlider = document.querySelector('.prev-slider')
    let closeBtn = document.querySelector('.close-slider')
    let currentSlider = document.querySelector('.current-slider')
    let nextSlider = document.querySelector('.next-slider')
    let nextArrow = document.querySelector('.next-arrow')
    let prevArrow = document.querySelector('.prev-arrow')
    let container = document.querySelector('.slider-container')
    prevSlider.insertAdjacentHTML('afterbegin', createCard(data[5][5]))
    currentSlider.insertAdjacentHTML('afterbegin', createCard(data[0][0]))
    nextSlider.insertAdjacentHTML('afterbegin', createCard(data[0][1]))
    createPlayers(position, nextPosition, prevPosition, currentSlider, nextSlider, prevSlider, data)
    closeBtn.addEventListener('click', () => {
        slider.style.opacity = '0'
        setTimeout(() => {
            wrapperSlider.lastElementChild.remove()
        }, 1000)
    })
    prevArrow.addEventListener('click', () => {
        container.classList.add('transition-right')
    })
    let player = container.querySelector('.description-player')
    nextArrow.addEventListener('click', () => {
        container.classList.add('transition-left')
    })

    container.addEventListener('animationend', (e) => {

        if (e.animationName == 'move-left') {
            container.classList.remove('transition-left')
            prevSlider.innerHTML = currentSlider.innerHTML
            currentSlider.innerHTML = nextSlider.innerHTML
            prevPosition = position
            position = nextPosition
            nextPosition = generateNextPosition(position, data)
            let nextPositionValue = nextPosition.split(',')
            nextSlider.innerHTML = createCard(data[nextPositionValue[0]][nextPositionValue[1]])
            createPlayers(position, nextPosition, prevPosition, currentSlider, nextSlider, prevSlider, data)
        } else {
            container.classList.remove('transition-right')
            nextSlider.innerHTML = currentSlider.innerHTML
            currentSlider.innerHTML = prevSlider.innerHTML
            nextPosition = position
            position = prevPosition
            prevPosition = generatePrevPosition(position)
            let prevPositionValue = prevPosition.split(',')
            let card = data[prevPositionValue[0]][prevPositionValue[1]]
            prevSlider.innerHTML = createCard(card)
            createPlayers(position, nextPosition, prevPosition, currentSlider, nextSlider, prevSlider, data)
        }
    })
}

function generateNextPosition(position, data) {
    let [firstPosition, secondPosition] = position.split(',')

    if (+secondPosition <= data[0].length - 2) {
        secondPosition++
    } else {
        secondPosition = 0
        if (+firstPosition <= data.length - 2) {
            firstPosition++
        } else {
            firstPosition = 0
        }
    }
    let pos = firstPosition + ',' + secondPosition
    return pos
}

function generatePrevPosition(position) {
    let [firstPosition, secondPosition] = position.split(',')

    if (+secondPosition > 0) {
        secondPosition--
    } else {
        secondPosition = 5
        if (+firstPosition > 0) {
            firstPosition--
        } else {
            firstPosition = 5
        }
    }
    let pos = firstPosition + ',' + secondPosition
    return pos
}

function getPosition(str, arr) {
    let pos = str.split(',')
    return arr[pos[0]][pos[1]]
}

function createPlayers(position, nextPosition, prevPosition, currentSlider, nextSlider, prevSlider, data) {
    createAudioPlayer(getPosition(position, data), currentSlider, 'description-player')
    createAudioPlayer(getPosition(nextPosition, data), nextSlider, 'description-player')
    createAudioPlayer(getPosition(prevPosition, data), prevSlider, 'description-player')
}
