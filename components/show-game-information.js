import {startGame} from "../../main.js";

export const showGameInformation = (node, info) => {
    const resultsWrapper=document.querySelector(`.${node}`)
    const results = JSON.parse(localStorage.getItem('results'))
    let resultItems=results ? results.map((e,i)=>{
        return `
        <li class="score-item">${i+1} - счет : <span>${e}</span></li>
        `
    }).join(''):"Нет результатов"
    console.log(resultsWrapper.firstChild)
    if(info){
        resultsWrapper.firstChild.textContent=''
        resultsWrapper.firstElementChild.innerHTML=info
    }else{
        resultsWrapper.firstChild.textContent='Результаты:'
        resultsWrapper.firstElementChild.innerHTML=resultItems
    }


    resultsWrapper.style.transform='translateX(0%)'
    resultsWrapper.addEventListener("click", (e)=>{
        if(e.target.classList.contains('result-list__restart')){
            startGame()
            resultsWrapper.parentElement.parentElement.classList.remove('open')
            resultsWrapper.parentElement.classList.remove('open')
            setTimeout(()=>{resultsWrapper.style.transform='translateX(100%)'},1000)

        }else if(e.target.classList.contains('result-list__close')){
            resultsWrapper.style.transform='translateX(100%)'
            resultsWrapper.parentElement.firstElementChild.style.opacity='1'
        }else if(e.target.classList.contains('result-list__remove')){
delete localStorage.results
            resultsWrapper.firstElementChild.innerHTML=' Нет результатов'
        }
    })
}