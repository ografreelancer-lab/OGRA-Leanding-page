const orderPreviewButton = document.getElementById("orderPreviewButton");
const openDemoButton = document.getElementById("openDemoButton");
const ograIntro = document.getElementById("ograIntro");

function showDemoMessage() {
  alert(
    "OGRA AI Demo\n\n" +
    "OGRA helps businesses answer visitor questions, explain services, capture leads, and guide customers toward WhatsApp, booking, checkout, or the next best action."
  );
}

function showFeatureMessage() {
  alert(
    "OGRA AI Features\n\n" +
    "• Business-aware answers\n" +
    "• Instant customer support\n" +
    "• Lead capture\n" +
    "• WhatsApp, booking, and checkout handoff\n" +
    "• Conversation insights"
  );
}

if (openDemoButton) {
  openDemoButton.addEventListener("click", showDemoMessage);
}

if (orderPreviewButton) {
  orderPreviewButton.addEventListener("click", showFeatureMessage);
}

if (ograIntro) {
  window.setTimeout(() => {
    ograIntro.classList.add("intro-finished");
  }, 4300);
}
