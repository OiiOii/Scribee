

function voicetoText(textInputArea,desc){
    
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition){
        
        let recognition = new SpeechRecognition();

        let recognizing = false;

        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onerror = function(event){
            // chrome.tabs.create({
            //     url: chrome.runtime.getURL("./scripts/micpermissions.html"),
          
            // });
            getLocalStream();
        }

        recognition.start();

        recognition.onspeechend = function() {
            desc.innerHTML = "TESTTEST";
        }

        recognition.onstart = function() {
            recognizing = true;
            desc.innerHTML = "Voice Recognition Active";
        }

        recognition.onend = function(){
            recognizing = false;
        }

        // recognition.onresult = function(event) {
        //     if (event.results.length > 0) {
        //       textInputArea.value += " " + event.results[0][0].transcript;
        //     }
        //   }

        recognition.onresult = function(event) {
            if (recognizing) {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        textInputArea.value += event.results[i][0].transcript;
                    }
                }
            }
        }

    }

}

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        console.log('Microphone access granted');
        // You can add additional logic here if needed
    })
    .catch(function(err) {
        console.error('Error accessing microphone:', err);
        // Handle the error accordingly
    });
}


// function getLocalStream() {
//     navigator.mediaDevices
//       .getUserMedia({ video: false, audio: true })
//       .then((stream) => {
//         window.localStream = stream; // A
//         window.localAudio.srcObject = stream; // B
//         window.localAudio.autoplay = true; // C
//       })
//       .catch((err) => {
//         console.error(`you got an error: ${err}`);
//       });
//   }


export{
    voicetoText
}