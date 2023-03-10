export const renderPlayer=()=>{
    const player = document.createElement('div')

    player.classList.add("player")
    player.innerHTML = `
                             <div class="btn-play"><img class="btn-image " src="./assets/play-64.png" alt="play"></div>
                            <div class="player-timer">
                                <div class="progress-container">
                                    <div class="progress"></div>
                                </div>
                                <div class="audio-controls">
                                <input type="range" class="audio-volume"  min="0" max="10">
                                <img src="assets/volume-control.png" alt="#" class="audio-image">
                                <div class="audio-duration">00:00</div>
                                </div>
                            </div>      
    `
    return player
}

export const stopPlayer = (playerBtn,audio)=>{
    playerBtn.src = './assets/play-64.png'
    audio.pause()
}
export const startPlayer = (playerBtn,audio)=>{
    playerBtn.src = './assets/pause-button.png'
    audio.play()
}
export const addZero =(value)=> {
    return value < 10 ? `0${value}` : value
}

