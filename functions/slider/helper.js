import createAudioPlayer from "../audioPlayer/create-audio-player.js";

export function generateNextPosition(position, data) {
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

export function generatePrevPosition(position) {
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

export function getPosition(str, arr) {
    let pos = str.split(',')
    return arr[pos[0]][pos[1]]
}

export function createPlayers(position, nextPosition, prevPosition, currentSlider, nextSlider, prevSlider, data) {
    createAudioPlayer(getPosition(position, data), currentSlider, 'description-player')
    createAudioPlayer(getPosition(nextPosition, data), nextSlider, 'description-player')
    createAudioPlayer(getPosition(prevPosition, data), prevSlider, 'description-player')
}

export function renderSlider() {
    let slider = document.createElement('div')
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
    slider.classList.add('slider')
    slider.style.opacity = '0'
    return slider
}
