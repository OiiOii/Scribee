

function voicetoText(textInputArea){

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    console.log("inside voice function");
    if(SpeechRecognition){
        
        let recognition = new SpeechRecognition();

        recognition.onerror = function(event){
            console.log("error");
            chrome.tabs.create({
                url: chrome.runtime.getURL("./scripts/micpermissions.html"),
                
            });
        }
        /*recognition.continuous = true;
        
        
        console.log("inside if statement");
        recognition.onresult = function (event) {
            console.log("inside on result function");
            for(let i = event.resultIndex; i < event.results.length; ++i){
                if(event.results[i].isFinal){
                    console.log(event.results[i][0].transcript);
                    textInputArea.value += event.results[i][0].transcript;
                }
            }
        }*/
        
        console.log("inside if statement");
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