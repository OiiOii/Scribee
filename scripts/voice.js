

function voicetoText(textInputArea,desc){
    
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition){
        
        let recognition = new SpeechRecognition();

        let recognizing = false;

        //recognition.continuous = true;
        recognition.interimResults = true;

        recognition.start();

        recognition.onspeechend = function() {
            desc.innerHTML = "Voice Recognition Inactive";
        }

        recognition.onstart = function() {
            recognizing = true;
            desc.innerHTML = "Voice Recognition Active";
        }

        recognition.onend = function(){
            recognizing = false;
        }

        recognition.onerror = function(event){
            if (!recognizing){
                chrome.tabs.create({
                    url: chrome.runtime.getURL("./scripts/micpermissions.html"),
            
                });
            }
            // Handle case where no speech is detected
            if (event.error === 'no-speech') {
                desc.innerHTML = "No speech detected. Check your mic setting!";
            }
            // Handle case where microphone is not accessible
            if (event.error === 'audio-capture') {
                desc.innerHTML = "Microphone not accessible.";
            }

        }

        recognition.onresult = function(event) {
            if (recognizing) {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        textInputArea.value +=" " + event.results[i][0].transcript+".";
                    }
                }
            }
        }

    }

}

//Trying micpermission
// function getLocalStream() {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//     .then(function(stream) {
//         console.log('Microphone access granted');
//     })
//     .catch(function(err) {
//         console.error('Error accessing microphone:', err);
//     });
// }

export{
    voicetoText
}