console.log("Welcome to Anywhere vibe!!");
//intial values;
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById ("myProgressBar");
let gif = document.getElementById ("gif");
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName ('songItem'));
let songs = [
    {songName:"Un Vizhigalil ", filePath:"songs/1.mp3", coverPath:"covers/1.jpeg"},
    {songName:"Thani Oruvan", filePath:"songs/2.mp3", coverPath:"covers/2.jpeg"},
    {songName:"Idhazhin-Oram", filePath:"songs/3.mp3", coverPath:"covers/3.jpeg"},
    {songName:"Kadhal Ondru Kanden", filePath:"songs/4.mp3", coverPath:"covers/4.jpeg"},
    {songName:"Meesaya Murukku", filePath:"songs/5.mp3", coverPath:"covers/5.jpeg"},
    {songName:"Nee Paartha Vizhigal ", filePath:"songs/6.mp3", coverPath:"covers/6.jpeg"},
    {songName:"Po Po Yen", filePath:"songs/7.mp3", coverPath:"covers/7.jpeg"},
    {songName:"Yaen Ennai Pirindhaai", filePath:"songs/8.mp3", coverPath:"covers/8.jpeg"}
    
]
songItem.forEach((element, i)=> {
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})
//play function:

//handle playing 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    } else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//listen to Event:

audioElement.addEventListener("timeupdate", ()=> {
    console.log('timeupdate');
    progess = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progess);
    myProgressBar.value = progess;
})
myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value* audioElement.duration/100;
})
const makeAllPlay = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play')
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener("click", ()=> {
    if (songIndex>=7){
        songIndex =0;
    }else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener("click", ()=> {
    if (songIndex<=0){
        songIndex =0;
    }else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})