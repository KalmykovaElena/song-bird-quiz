import {startGame} from "../main.js";

export const showGameInformation = (node, info) => {
    const resultsWrapper = document.querySelector(`.${node}`)
    const perfomance = document.querySelector('.start-page-performance')
    const results = JSON.parse(localStorage.getItem('results'))
    let resultItems = results ? results.map((e, i) => {
        return `
        <li class="score-item">${i + 1} - счет : <span>${e}</span></li>
        `
    }).join('') : "Нет результатов"
    console.log(resultsWrapper.firstChild)
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
    resultsWrapper.addEventListener("click", (e) => {
        if (e.target.classList.contains('result-list__restart')) {
            startGame()
            perfomance.classList.remove('info-open-page')
            resultsWrapper.parentElement.parentElement.classList.remove('open')
            resultsWrapper.parentElement.classList.remove('open')
            setTimeout(() => {
                resultsWrapper.style.transform = 'translateX(100%)'
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
    })
}