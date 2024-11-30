// Select Elements
const musicContainer = document.querySelector(".container"); // Select container
const playBtn = document.getElementById("play-pause"); // Play/Pause button
const prevBtn = document.getElementById("prev"); // Previous button
const nextBtn = document.getElementById("next"); // Next button
const barPlayIcon = document.querySelector(".bar-play i"); // Bar-play icon

const audio = document.getElementById("audio"); // Audio element
const progress = document.getElementById("progress"); // Progress bar
const progressContainer = document.getElementById("progress-container"); // Progress bar container
const title = document.getElementById("title"); // Title of the song
const cover = document.getElementById("cover"); // Cover image

// Song Titles
const songs = ["Chief Keef", "Kevin Gates", "Lil Durk"];

// Track the current song
let songIndex = 0;

// Load initial song
loadSong(songs[songIndex]);

// Function to load song details
function loadSong(song) {
  title.innerText = song; // Update song title
  audio.src = `music/${song}.mp3`; // Update audio source
  cover.src = `images/${song}.jpg`; // Update cover image
}

// Function to play the song
function playSong() {
  musicContainer.classList.add("play"); // Add play class
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.remove("fa-play"); // Switch to pause icon
  playIcon.classList.add("fa-pause"); // Show pause icon

  barPlayIcon.classList.remove("fa-play"); // Switch bar-play icon to pause
  barPlayIcon.classList.add("fa-pause"); // Show pause icon

  audio.play(); // Play the audio
}

// Function to pause the song
function pauseSong() {
  musicContainer.classList.remove("play"); // Remove play class
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.remove("fa-pause"); // Switch to play icon
  playIcon.classList.add("fa-play"); // Show play icon

  barPlayIcon.classList.remove("fa-pause"); // Switch bar-play icon to play
  barPlayIcon.classList.add("fa-play"); // Show play icon

  audio.pause(); // Pause the audio
}

// Function to go to the previous song
function prevSong() {
  songIndex--; // Decrease song index
  if (songIndex < 0) {
    songIndex = songs.length - 1; // Wrap around to the last song
  }
  loadSong(songs[songIndex]); // Load previous song
  playSong(); // Auto-play the song
}

// Function to go to the next song
function nextSong() {
  songIndex++; // Increase song index
  if (songIndex > songs.length - 1) {
    songIndex = 0; // Wrap around to the first song
  }
  loadSong(songs[songIndex]); // Load next song
  playSong(); // Auto-play the song
}

// Function to update the progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement; // Get duration and current time
  const progressPercent = (currentTime / duration) * 100; // Calculate progress
  progress.style.width = `${progressPercent}%`; // Update progress bar
}

// Function to set progress on click
function setProgress(e) {
  const width = this.clientWidth; // Width of the progress container
  const clickX = e.offsetX; // Position of the click
  const duration = audio.duration; // Total duration of the song
  audio.currentTime = (clickX / width) * duration; // Set current time
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong); // Previous button click
nextBtn.addEventListener("click", nextSong); // Next button click

audio.addEventListener("timeupdate", updateProgress); // Update progress bar as song plays
progressContainer.addEventListener("click", setProgress); // Click on progress bar to set time
audio.addEventListener("ended", nextSong); // Play next song when current one ends
