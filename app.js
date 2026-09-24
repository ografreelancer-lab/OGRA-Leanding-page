const orderPreviewButton = document.getElementById("orderPreviewButton");
const openDemoButton = document.getElementById("openDemoButton");

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

openDemoButton.addEventListener("click", showDemoMessage);

orderPreviewButton.addEventListener("click", showOrderMessage);
