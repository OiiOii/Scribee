

function voicetoText(textInputArea){
    
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition){
        
        let recognition = new SpeechRecognition();

        recognition.onerror = function(event){
            chrome.tabs.create({
                url: chrome.runtime.getURL("./scripts/micpermissions.html"),
                
            });
        }
        
        recognition.start();
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
              textInputArea.value += " " + event.results[0][0].transcript;
            }
          }
        

    }

}


export{
    voicetoText
}