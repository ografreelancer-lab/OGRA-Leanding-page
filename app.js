const orderPreviewButton = document.getElementById("orderPreviewButton");
const openDemoButton = document.getElementById("openDemoButton");
const soundButton = document.getElementById("soundButton");
const sandLayer = document.getElementById("sandLayer");

let soundEnabled = false;

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

function playTone(audioContext, frequency, startTime, duration, volume, type) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

function playIntroSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  const audioContext = new AudioContext();
  const now = audioContext.currentTime;

  playTone(audioContext, 280, now, 0.12, 0.06, "triangle");
  playTone(audioContext, 190, now + 0.07, 0.16, 0.05, "sawtooth");
  playTone(audioContext, 760, now + 0.26, 0.35, 0.07, "sine");
  playTone(audioContext, 1020, now + 0.36, 0.42, 0.05, "sine");

  setTimeout(() => {
    audioContext.close();
  }, 1200);
}

function createSandParticles() {
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
  soundButton.addEventListener("click", () => {
    soundEnabled = true;
    playIntroSound();

    soundButton.innerHTML = "<span>✓</span> Intro sound enabled";
  });
}

setTimeout(() => {
  createSandParticles();

  if (soundEnabled) {
    playIntroSound();
  }
}, 5050);

if (openDemoButton) {
  openDemoButton.addEventListener("click", showDemoMessage);
}

if (orderPreviewButton) {
  orderPreviewButton.addEventListener("click", showOrderMessage);
}
