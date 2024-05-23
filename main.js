const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//sira
let index;

//dongu
let loop = false;

//sarki listesi
const songsList = [
  {
    name: "Gelo Ew Ki Bu",
    link: "assets/gelo-ew-ki-bu.mp3",
    artist: "Aram Tigran",
    image: "assets/aram-tigran.jpeg",
  },
  {
    name: "Gitme Kal",
    link: "assets/yara-bere-icindeyim.mp3",
    artist: "Hira-i Zerdust",
    image: "assets/hirai.jpeg",
  },
  {
    name: "Aramam",
    link: "assets/aramam.mp3",
    artist: "Ibrahim Tatlises",
    image: "assets/ibrahim-tatlises.jpeg",
  },
  {
    name: "Ax Eman",
    link: "assets/ax-eman.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpeg",
  },
  {
    name: "Dinle",
    link: "assets/dinle.mp3",
    artist: "Mahsun Kirmizigul",
    image: "assets/mahsun.jpeg",
  },
];

//sariki atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata =() =>{
    maxDuration.innerText =timeFormatter(audio.duration) //240sn
  }
  playAudio();
};

//oynatma listesini göster
playListButton.addEventListener('click',()=>{
  playListContainer.classList.remove('hide')
})

//oynatma listesini gizle
closeButton.addEventListener('click',()=>{
  playListContainer.classList.add('hide')
})

// tekrar tıklanıldığında
repeatButton.addEventListener('click',() => {
  if (repeatButton.classList.contains('active')) {
    repeatButton.classList.remove('active')
    audio.loop =true
    console.log('tekrar kapatıldı')
    
  }else{
    repeatButton.classList.add('active')
    audio.loop = false
    console.log('tekrar acildi')
  }
})

//karistirici tiklanildiğida 
shuffleButton.addEventListener('click',()=>{
if (shuffleButton.classList.contains("active")) {
   shuffleButton.classList.remove('active')
   loop = false
   console.log('karıştırm kapalı')
  
}else{
  shuffleButton.classList.add('active')
  loop=true
  console.log('karıştırma açık')
}
 
})
//ilerleme çubuğuna tıklanıldığında
progressBar.addEventListener('click',(event)=>{
  let coordStart =progressBar.getBoundingClientRect().left
  console.log(coordStart)

  let coordEnd =event.clientX
  console.log(coordEnd)


  console.log(progressBar.offsetWidth)
  let progress = (coordEnd-coordStart) / progressBar.offsetWidth
  

  currentProgress.style.width =progress * 100 + "%"
  audio.currentTime=progress*audio.duration
  audio.play()
  

})

//zaman tutucu
setInterval(() => {
  currentProgress.style.width =(audio.currentTime/audio.duration.toFixed(3))*100 +'%'
  
}, 1000);

//sarkıyı oynat
const playAudio = () => {
  audio.play
  playButton.classList.add("hide")
  pauseButton.classList.remove("hide")
};

//sarkıyı durdur
const pauseAudio = () => {
  audio.pause()
  pauseButton.classList.add("hide")
  playButton.classList.remove("hide")
};

//sonraki sarki
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

// önceki sarkı
const previousSong = () =>{
  pauseAudio()
    if (index > 0) {

          index=index - 1
      
    }else {
      index =songsList.length -1
    }
    setSong(index)
  }
    
  //sarkı biitiğinde
  audio.onended = () =>{
    nextSong()
  }
  

   //zaman düzenlemesi
    const timeFormatter=(timeInput) =>{
    let minute =Math.floor(timeInput/60)
    minute = minute < 10 ?'0'+ minute :minute
    let second = Math.floor(timeInput %60)
    second = second < 10 ? '0' + second :second
    return `${minute}:${second}`
  }

  // sarki  süresi değiştikce
   audio.addEventListener('timeupdate',() => {
    currentTimeRef.innerText=timeFormatter(audio.currentTime)

  })
  //sarkı listesi oluştur
  const initPlaylist = ()=>{
    for(const i in songsList){
      playListSongs.innerHTML +=`<li class ="playListSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
      <img src="${songsList[i].image}"/>
      </div>
      <div class="playlist-song-details">
      <span id="playlist-song-name">
      ${songsList[i].name}
      <span/>
      <span id="playlist-song-artist-album">
      ${songsList[i].artist}
      </span>
      <div/>
      </li> `
    }
  }

 
//oynatarak tıklandığında
playButton.addEventListener("click", playAudio);

//dura tıklandığında
pauseButton.addEventListener("click", pauseAudio);

//sonrakine geç tıklanıldığında
nextButton.addEventListener("click", nextSong);

//öncekinekine tıklanıldığında
prevButton.addEventListener("click", previousSong);



window.onload = () => {
  index = 0
  setSong(index)
  pauseAudio()
  initPlaylist()
};

