const ctx = new (window.AudioContext || window.webkitAudioContext)();
let audio;

// first fetch the audio file, get it into a buffer then decode it
fetch("./sounds/guitar.mp3")
  //we need to put data into arrayBuffer to process as a node without latency
  .then(data => data.arrayBuffer())
  //we need to decode the data that is now in the buffer
  .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
  .then(decodedAudio => {
    audio = decodedAudio;
  });

//create a function so that we can actually use this audio
function playback() {
  const playSound = ctx.createBufferSource();
  playSound.buffer = audio;
  playSound.connect(ctx.destination);
  playSound.start(ctx.currentTime);
  playSound.stop(10);
}

window.addEventListener("mousedown", playback);

// const osc = ctx.createOscillator();

// osc.connect(ctx.destination);

// osc.frequency.value = 600;
// osc.start(0);
// osc.stop(1);
