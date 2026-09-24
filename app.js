const orderPreviewButton = document.getElementById("orderPreviewButton");
const openDemoButton = document.getElementById("openDemoButton");
const soundButton = document.getElementById("soundButton");
const sandLayer = document.getElementById("sandLayer");

let soundEnabled = false;
let audioContext = null;

function showDemoMessage() {
  alert(
    "OGRA AI Demo\n\n" +
    "This landing page is ready.\n\n" +
    "Next we will build a real chatbot where visitors can ask questions, get answers, and click a WhatsApp order link."
  );
}

function showOrderMessage() {
  alert(
    "WhatsApp Order Preview\n\n" +
    "In the full OGRA AI version, this button will send a customer directly to the business owner's WhatsApp number or checkout page."
  );
}

async function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext || audioContext.state === "closed") {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  return audioContext;
}

function playTone(context, frequency, startTime, duration, volume, type) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

async function playTestChime() {
  const context = await getAudioContext();

  if (!context) {
    return;
  }

  const now = context.currentTime;

  playTone(context, 523.25, now, 0.18, 0.09, "sine");
  playTone(context, 659.25, now + 0.11, 0.22, 0.08, "sine");
  playTone(context, 783.99, now + 0.22, 0.3, 0.07, "triangle");
}

async function playGlassBreakSound() {
  const context = await getAudioContext();

  if (!context) {
    return;
  }

  const now = context.currentTime;

  playTone(context, 310, now, 0.10, 0.07, "triangle");
  playTone(context, 210, now + 0.06, 0.14, 0.06, "sawtooth");
  playTone(context, 140, now + 0.14, 0.18, 0.04, "sawtooth");

  playTone(context, 740, now + 0.26, 0.32, 0.08, "sine");
  playTone(context, 1040, now + 0.36, 0.42, 0.06, "sine");
}

function createSandParticles() {
  if (!sandLayer) {
    return;
  }

  const colors = ["#d7a54a", "#f4dfa3", "#8c552b", "#fff0c7", "#b77a2e"];

  for (let i = 0; i < 90; i += 1) {
    const particle = document.createElement("span");
    const size = Math.floor(Math.random() * 6) + 3;
    const x = Math.floor(Math.random() * 1300 - 650);
    const delay = Math.random() * 0.3;
    const duration = 0.7 + Math.random() * 0.8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.className = "sand-particle";
    particle.style.setProperty("--size", size + "px");
    particle.style.setProperty("--x", x + "px");
    particle.style.setProperty("--delay", delay + "s");
    particle.style.setProperty("--duration", duration + "s");
    particle.style.setProperty("--particle-color", color);

    sandLayer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, (delay + duration + 0.4) * 1000);
  }
}

if (soundButton) {
  soundButton.addEventListener("click", async () => {
    soundEnabled = true;

    try {
      await playTestChime();
      soundButton.innerHTML = "<span>✓</span> Sound enabled";
    } catch (error) {
      soundButton.innerHTML = "<span>!</span> Browser blocked sound";
    }
  });
}

setTimeout(() => {
  createSandParticles();

  if (soundEnabled) {
    playGlassBreakSound();
  }
}, 5050);

if (openDemoButton) {
  openDemoButton.addEventListener("click", showDemoMessage);
}

if (orderPreviewButton) {
  orderPreviewButton.addEventListener("click", showOrderMessage);
}
