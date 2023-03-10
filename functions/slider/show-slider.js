import {createCard} from "../show-card.js";
import {createPlayers, generateNextPosition, generatePrevPosition, renderSlider} from "./helper.js";

export const showSlider = (data) => {
    let position = '0,0'
    let nextPosition = '0,1'
    let prevPosition = '5,5'
    let wrapperSlider = document.querySelector('.start-page-wrapper')

    const slider = renderSlider()
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
    // let player = container.querySelector('.description-player')
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


