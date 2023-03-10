import {addZero, renderPlayer, startPlayer, stopPlayer} from "./helpers.js";

function CreateAudioPlayer(card, place, selector) {
    let placeForPlayer = place.querySelector('.' + selector)
    let isPlaying = false
    const player = renderPlayer()
    const audio = document.createElement('audio');
    placeForPlayer.replaceChildren()
    placeForPlayer.append(player)
    audio.src = (card.audio);
    player.append(audio)
    const playerBtn = placeForPlayer.querySelector('.btn-image')
    const volume = placeForPlayer.querySelector('.audio-volume')
    const progress = placeForPlayer.querySelector('.progress')
    const progressContainer = placeForPlayer.querySelector('.progress-container')
    const timer = placeForPlayer.querySelector('.audio-duration')

    playerBtn.addEventListener('click', () => {
        isPlaying = !isPlaying
        isPlaying ? startPlayer(playerBtn, audio) : stopPlayer(playerBtn, audio)
    })

    audio.addEventListener('timeupdate', (e) => {
        const {duration, currentTime} = e.srcElement
        const progressPercent = (currentTime / duration) * 100
        const progressTime = duration ? Math.ceil(duration - currentTime) : 0
        progress.style.width = `${progressPercent}%`

        if (progressPercent === 100) {
            isPlaying = !isPlaying
            playerBtn.src = './assets/play-64.png'
        }

        timer.innerHTML = progressTime >= 60
            ? `${addZero(Math.ceil(progressTime / 60))}:${addZero(progressTime % 60)}`
            : `00:${addZero(progressTime)}`
    })

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
