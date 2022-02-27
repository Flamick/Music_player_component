let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector('.track-name');
let trackArtist = document.querySelector('.track-artist');

let playpauseBtn = document.querySelector('.playpause-track');
let nextBtn = document.querySelector('.next-track');
let prevBtn = document.querySelector('.prev-track');

let seekSlider = document.querySelector('.seek-slider');
let volumeSlider = document.querySelector('.volume-slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let currentTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img : 'img/image_1.jpg',
        name : 'Smokey\'s Lounge',
        artist : 'TrackTribe',
        music : 'music/Smokey\'s Lounge - TrackTribe.mp3'
    },
    {
        img : 'img/image_2.jpg',
        name : 'Ponderous Days',
        artist : 'Joel Cummins',
        music : 'music/Ponderous Days - Joel Cummins.mp3'
    },
    {
        img : 'img/image_3.jpg',
        name : 'Vespers on the Shore',
        artist : 'The Mini Vandals',
        music : 'music/Vespers on the Shore - The Mini Vandals.mp3'
    },
    {
        img : 'img/image_4.jpg',
        name : 'Good Gig In the Clouds',
        artist : 'Joel Cummins',
        music : 'music/Good Gig In the Clouds - Joel Cummins.mp3'
    },
    {
        img : 'img/image_2.jpg',
        name : 'Till I Let Go',
        artist : 'NEFFEX',
        music : 'music/Till I Let Go - NEFFEX.mp3'
    },
]

loadTrack(trackIndex);

function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    reset();

    currentTrack.src = musicList[trackIndex].music;
    currentTrack.load();

    trackArt.style.backgroundImage = 'url(' + musicList[trackIndex].img + ')';
    trackName.textContent =  musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    nowPlaying.textContent = 'Playing music ' + (trackIndex + 1) + ' of ' + musicList.length;

    updateTimer = setInterval(setUpdate, 1000);

    currentTrack.addEventListener('ended', nextTrack);
    randomBgColor();
}

function randomBgColor() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a) {
        for(let i=0; i<6; i++) {
            let x = Math.round(Math.random() *14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let color1 = populate('#');
    let color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + color1 + ', ' + color2 + ')';
    document.body.style.background = gradient;
}

function reset() {
    currentTime.textContent = '00:00';
    totalDuration.textContent = '00:00';
    seekSlider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}


function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    currentTrack.play();
    isPlaying = true;
    trackArt.classList.add('rotate');
    wave.classList.add('loader');
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    trackArt.classList.remove('rotate');
    wave.classList.remove('loader');
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if(trackIndex < musicList.length -1 && isRandom === false) {
        trackIndex += 1;
    }   else if(trackIndex < musicList.length - 1 && isRandom === true) {
        let randomIndex = Number.parseInt(Math.random() * musicList.length);
        trackIndex = randomIndex
    }   else    {
        trackIndex = 0;
    }

    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    if(trackIndex > 0) {
        trackIndex -= 1;
    }   else    {
        trackIndex = musicList.length - 1;
    }

    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    let seekto = currentTrack.duration * (seekSlider.value / 100);
    currentTrack.currentTime = seekto;
}

function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if(!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime -  currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = '0' + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = '0' + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = '0' + durationMinutes;}

        currentTime.textContent = currentMinutes + ':' + currentSeconds;
        totalDuration.textContent = durationMinutes + ':' + durationSeconds;
    }
}