import {startGame} from "./startGame/start-game.js";

export const showGameInformation = (node, info) => {
    const resultsWrapper = document.querySelector(`.${node}`)
    resultsWrapper.removeEventListener("click", handleClick)
    const perfomance = document.querySelector('.start-page-performance')
    const results = JSON.parse(localStorage.getItem('results'))
    let resultItems = results ? results.map((e, i) => {
        return `
        <li class="score-item">${i + 1} - счет : <span>${e}</span></li>
        `
    }).join('') : "Нет результатов"

    if (info) {
        resultsWrapper.firstChild.textContent = ''
        resultsWrapper.firstElementChild.innerHTML = info
        resultsWrapper.querySelector('.result-list__remove').style.display = 'none'
    } else {
        resultsWrapper.firstChild.textContent = 'Результаты:'
        resultsWrapper.firstElementChild.innerHTML = resultItems
        resultsWrapper.querySelector('.result-list__remove').style.display = 'block'
    }

    resultsWrapper.classList.add('info-open')
    perfomance.classList.add('info-open-page')

    if (resultsWrapper.classList.contains('info-close')) {
        resultsWrapper.classList.remove('info-close')
    }
     resultsWrapper.addEventListener("click", handleClick, { once: true })

    function handleClick (e){
        if (e.target.classList.contains('result-list__restart')) {
            startGame()
            perfomance.classList.remove('info-open-page')
            resultsWrapper.parentElement.firstElementChild.style.opacity = '1'
            resultsWrapper.parentElement.parentElement.classList.remove('open')
            resultsWrapper.parentElement.classList.remove('open')
            setTimeout(() => {
                resultsWrapper.classList.remove('info-open')
                resultsWrapper.classList.add('info-close')
            }, 1000)

        } else if (e.target.classList.contains('result-list__close')) {
            resultsWrapper.classList.remove('info-open')
            resultsWrapper.classList.add('info-close')
            perfomance.classList.remove('info-open-page')
            resultsWrapper.parentElement.firstElementChild.style.opacity = '1'
        } else if (e.target.classList.contains('result-list__remove')) {
            delete localStorage.results
            resultsWrapper.firstElementChild.innerHTML = ' Нет результатов'
        }
    }
}
