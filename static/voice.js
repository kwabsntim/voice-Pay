//writing the function for the text to speech

function speak(text){
    const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB"; // or en-US
  utterance.rate = 0.9;    // slower = clearer for elderly
  window.speechSynthesis.speak(utterance);
}
//setup for the speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-GB";
recognition.continuous = false;
recognition.interimResults = false;
//button press logic 
micBtn.onclick = () => {
  speak("Welcome to VoicePay. Say confirm to process your payment.");
  update.innerText = "Listening...";
  recognition.start();
};
//handling the results from speech recognition

recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript.toLowerCase().trim();
  update.innerText = `You said: "${spokenText}"`;

  if (spokenText === "confirm") {
    speak("Processing payment");
    startPayment();
  } else {
    speak("Please say confirm");
  }
};

//error handling logic
recognition.onerror = () => {
  speak("Sorry, I did not hear you. Please try again.");
};

//backend logic to start payment
function startpayment(){
    fetch('/start-payment', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        speak("Payment initialization failed.");
        update.innerText = "Payment initialization failed.";
      }
    })
    .catch(() => {
      speak("Payment initialization failed.");
      update.innerText = "Payment initialization failed.";
    });
}