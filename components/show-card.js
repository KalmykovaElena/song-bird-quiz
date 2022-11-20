import CreateAudioPlayer from "./create-audio-player.js";


export function showCard(id, array) {
    let checkedCard = (array.filter(el => el.id === id))[0]
    let descriptionCard = document.querySelector('.game-board__description')
    descriptionCard.replaceChildren()
    descriptionCard.insertAdjacentHTML('afterbegin', createCard(checkedCard))
    CreateAudioPlayer(checkedCard, descriptionCard, 'description-player')
};

export function createCard(card) {
    return `
     <div class="game-board__description-image">
                            <img class="image description-image"  src=${card.image} alt=${card.name}>
                        </div>
                        <ul class="game-board__description-main-info">
                            <li class="info-item"><h3>${card.name}</h3></li>
                            <li class="info-item">${card.species}</li>
                            <li class="info-item description-player"></li>
                        </ul>
                        <div class="game-board__description-info">
                            ${card.description}
                        </div>
    `

}