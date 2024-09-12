console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let timestamp = document.getElementsByClassName("timestamp");
let bottomTotalDuration = document.getElementById("bottomTotalDuration");
let bottomCurrentDuration = document.getElementById("bottomCurrentDuration");
let download = document.getElementById("download");


// console.log(timestamp);

let songs = [
    {songName:"Theme of Kalki", filePath:"songs/1.mp3", coverPath:"images/1.jpg", duration:"03:09 "},
    {songName:"Bujji Theme", filePath:"songs/2.mp3", coverPath:"images/1.jpg", duration:"00:46 "},
    {songName:"Keshawa Madhava", filePath:"songs/3.mp3", coverPath:"images/1.jpg", duration:"01:30 " },
    {songName:"Bhairava Anthem", filePath:"songs/4.mp3", coverPath:"images/1.jpg", duration:"02:43 "},
    {songName:"Ta Takkara Takka Takkara", filePath:"songs/5.mp3", coverPath:"images/1.jpg", duration:"02:39 "},
    {songName:"Introducing Ashwatthama", filePath:"songs/6.mp3", coverPath:"images/1.jpg", duration:"01:09 "},
    {songName:"Kalki 2898 AD Glimpse", filePath:"songs/7.mp3", coverPath:"images/1.jpg", duration:"01:15 "},
    {songName:"Sooreede", filePath:"songs/8.mp3", coverPath:"images/2.jpg", duration:"03:18 "},
    {songName:"Prathikadalo", filePath:"songs/9.mp3", coverPath:"images/2.jpg", duration:"03:07 "},
    {songName:"Sound of Salaar", filePath:"songs/10.mp3", coverPath:"images/2.jpg", duration:"02:55 "},
    {songName:"Fear of Devara", filePath:"songs/11.mp3", coverPath:"images/3.jpg", duration:"03:16 "}
];

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    timestamp[i].innerText = songs[i].duration;
})

// Listen to Events


download.addEventListener('click',()=>{
    console.log(download);
    download.href = songs[songIndex].filePath;
})


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.getElementById(songIndex).classList.add('fa-circle-pause');
        document.getElementById(songIndex).classList.remove('fa-circle-play');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        let id = element.id;
        songIndex = parseInt(e.target.id);
        // makeAllPlays();
        // audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        bottomTotalDuration.innerText = songs[songIndex].duration;
        // audioElement.currentTime = 0;
        // audioElement.play();
        if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.getElementById(songIndex).classList.add('fa-circle-pause');
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        }else {
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            document.getElementById(songIndex).classList.add('fa-circle-play');
            document.getElementById(songIndex).classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
            makeAllPlays();
        }

    })
})



audioElement.addEventListener("timeupdate", ()=>{
    let currentTime = parseInt(audioElement.currentTime);
    let minutes = 0;
    let seconds = 0;
    minutes = parseInt(currentTime /60);
    seconds = currentTime % 60;
    if(seconds<=9 && minutes==0){
    bottomCurrentDuration.innerText = "00:0" + seconds;
    }else if(seconds>9 && minutes==0) {
    bottomCurrentDuration.innerText = "00:" + seconds;
    }else if(seconds<=9 && minutes>0){
    bottomCurrentDuration.innerText = "0" + minutes + ":0" + seconds;
    }else if(seconds>9 && minutes>0){
        bottomCurrentDuration.innerText = "0" + minutes + ":" + seconds;
    }
    
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;

    if(myProgressBar.value == 100) {
        myProgressBar.value = 0;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        bottomCurrentDuration.innerText = "00:00";
        audioElement.play();
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;

})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        })
}


document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    bottomTotalDuration.innerText = songs[songIndex].duration;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    document.getElementById(songIndex).classList.remove('fa-circle-play');
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=10) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    bottomTotalDuration.innerText = songs[songIndex].duration;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    document.getElementById(songIndex).classList.remove('fa-circle-play');
})


