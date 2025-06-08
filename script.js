const statusEl = document.getElementById('status');
const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

let audioContext;
let analyser;
let dataArray;

function getVolume() {
  analyser.getByteTimeDomainData(dataArray);
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    let value = (dataArray[i] - 128) / 128;
    sum += value * value;
  }
  let volume = Math.sqrt(sum / dataArray.length);
  return volume;
}

function draw() {
  requestAnimationFrame(draw);

  const volume = getVolume();
  statusEl.textContent = `Volume: ${volume.toFixed(3)}`;

  // For now, we just draw a background color that changes with volume
  const green = Math.min(255, Math.floor((1 - volume) * 255));
  ctx.fillStyle = `rgb(200, ${green}, 200)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

async function startAudio() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;

    const bufferLength = analyser.fftSize;
    dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);

    statusEl.textContent = "Listening...";
    draw();
  } catch (err) {
    statusEl.textContent = "Microphone access denied or error.";
    console.error(err);
  }
}

startAudio();
