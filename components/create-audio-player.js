function CreateAudioPlayer(card, place, selector) {
    let placeForPlayer = place.querySelector('.' + selector)
    placeForPlayer.innerHTML = ''
    const player = document.createElement('div')
    player.classList.add("player")
    placeForPlayer.append(player)
    player.innerHTML = `
                             <div class="btn-play"><img class="btn-image " src="./assets/play-64.png" alt="play"></div>
                            <div class="player-timer">
                                <div class="progress-container">
                                    <div class="progress"></div>
                                </div>
                                <div class="audio-controls">
                                <input type="range" class="audio-volume"  min="0" max="10">
                                <img src="../assets/volume-control.png" alt="#" class="audio-image">
                                <div class="audio-duration">00:00</div>
                                </div>
                            </div>      
    `
    let isPlaying = false
    const audio = document.createElement('audio');
    audio.src = (card.audio);
    player.append(audio)
    const playerBtn = placeForPlayer.querySelector('.btn-image')
    const volume = placeForPlayer.querySelector('.audio-volume')
    const progress = placeForPlayer.querySelector('.progress')
    const progressContainer = placeForPlayer.querySelector('.progress-container')
    const timer = placeForPlayer.querySelector('.audio-duration')

    playerBtn.addEventListener('click', function () {
        isPlaying = !isPlaying
        if (isPlaying) {
            playerBtn.src = './assets/pause-button.png'
            audio.play()

        } else {
            playerBtn.src = './assets/play-64.png'
            audio.pause()
        }
    })

    audio.addEventListener('timeupdate', (e) => {
        const {duration, currentTime} = e.srcElement
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        const progressTime = duration ? Math.ceil(duration - currentTime) : 0
        if (progressPercent === 100) {
            isPlaying = !isPlaying
            playerBtn.src = './assets/play.png'
        }

        timer.innerHTML = progressTime >= 60 ? `${addZero(Math.ceil(progressTime / 60))}:${addZero(progressTime % 60)}` : `00:${addZero(progressTime)}`
    })

    function addZero(value) {
        return value < 10 ? `0${value}` : value
    }

    progressContainer.addEventListener('click', setProgress)

    function setProgress(e) {
        const width = this.clientWidth
        const clickX = e.offsetX
        const duration = audio.duration
        audio.currentTime = (clickX / width) * duration
    }

    volume.addEventListener('change', function () {
        audio.volume = (this.value) / 10;
        localStorage.setItem('volume', JSON.stringify(audio.volume))
    })
    return audio
};

export default CreateAudioPlayer;