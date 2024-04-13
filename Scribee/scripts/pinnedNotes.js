import { clearContainer } from "./frontPage.js";
import { voicetoText } from "./voice.js";                          //**********newly added(for the voice rec to work under the editing)

function viewPinnedNotes(){
    chrome.storage.local.get({'notesDatabase':[]}, function(result){

        let notesDatabase = result.notesDatabase;
        const container = document.querySelector('.container');

        if(typeof notesDatabase === 'undefined'){
            chrome.storage.local.set({'notesDatabase': list});
        }

        if(notesDatabase?.length === 0){
            
            const noNotesMessage  = document.createElement('p');
            noNotesMessage.setAttribute("class", "noNotesMessage");
            noNotesMessage.innerHTML = "Write notes and pin them to display here!";
            container.appendChild(noNotesMessage);

        }else{
            
            for(let i = 0; i < notesDatabase.length; i++){
                if(notesDatabase[i].pinned == true){
                    const pinnoteCard = document.createElement('div');
                    pinnoteCard.setAttribute("class", "pinnoteCard");
                    container.appendChild(pinnoteCard);

                    const titleP = document.createElement('p');
                    titleP.setAttribute("class", "pintitleP");
                    
                    titleP.innerHTML = notesDatabase[i].title;
                    
                    pinnoteCard.appendChild(titleP);

                    const textP = document.createElement('p');
                    textP.setAttribute("class", "pintextP");
                    textP.innerHTML = notesDatabase[i].text;
                    pinnoteCard.appendChild(textP);

                    const dateP = document.createElement('p');
                    dateP.setAttribute("class", "pindateP");
                    dateP.innerHTML = notesDatabase[i].date;
                    pinnoteCard.appendChild(dateP);

                    const pinbtnsdiv = document.createElement('div');
                    pinbtnsdiv.setAttribute("class", "pinbtnsdiv");
                    pinnoteCard.appendChild(pinbtnsdiv);

                    //*******************************************************************code below this line were recently added (for edit feature)
                    const editbtn = document.createElement('button');
                    editbtn.setAttribute("class", "editbtn");
                    editbtn.innerHTML = "";
                    pinbtnsdiv.appendChild(editbtn);


                    let editimg = document.createElement('img');
                    editimg.src = '../imgs/edit.png';
                    editbtn.appendChild(editimg);

                    editbtn.addEventListener('click', (event)=>{
                        clearContainer();

                        const noteInputDiv = document.createElement('div');
                        noteInputDiv.setAttribute("class", "noteInputDiv");
                        container.appendChild(noteInputDiv);

                        const form = document.createElement('form');
                        noteInputDiv.appendChild(form);

                        const titleInput = document.createElement('input');
                        titleInput.setAttribute("class", "titleInput");
                        titleInput.setAttribute("type", "text");
                        titleInput.setAttribute("placeholder", "Title");
                        titleInput.value = notesDatabase[i].title
                        form.appendChild(titleInput);

                        const textInput = document.createElement('textarea');
                        textInput.setAttribute("class", "textInput");
                        textInput.setAttribute("placeholder", "Write your note here...");
                        textInput.value = notesDatabase[i].text;
                        
                        form.appendChild(textInput);

                        //use this date object to get the day, month, year, hours, and minutes
                        const date = new Date();
                        const dateAndTimeString = date.toLocaleDateString() + " " + date.toLocaleTimeString();
                        
                        const savebtn = document.createElement('button');
                        savebtn.setAttribute("class", "savebtn");
                        savebtn.innerHTML = "";
                        noteInputDiv.appendChild(savebtn);

                        let checkimg = document.createElement('img');
                        checkimg.src = '../imgs/check.png';
                        savebtn.appendChild(checkimg);

                        savebtn.addEventListener('click', (event)=>{
                            notesDatabase[i].title = titleInput.value;
                            notesDatabase[i].text = textInput.value;
                            notesDatabase[i].date = dateAndTimeString;

                            chrome.storage.local.set({'notesDatabase':notesDatabase});
                            clearContainer();
                            viewPinnedNotes();
                            event.preventDefault();
                        });    

                        const voicebtn = document.createElement('button');
                        voicebtn.setAttribute("class", "voicebtn");
                        voicebtn.innerHTML = "";
                        noteInputDiv.appendChild(voicebtn);

                        let micimg = document.createElement('img');
                        micimg.src = '../imgs/mic.png';
                        voicebtn.appendChild(micimg);
                    
                        voicebtn.addEventListener('click', (event)=>{
                            voicetoText(textInput);
                            event.preventDefault();
                    
                        });

                        const copy_linkbtn = document.createElement('button');
                        copy_linkbtn.setAttribute("class", "copy_linkbtn");
                        copy_linkbtn.innerHTML = "";
                        noteInputDiv.appendChild(copy_linkbtn);

                        let linkimg = document.createElement('img');
                        linkimg.src = '../imgs/copy-link.png';
                        copy_linkbtn.appendChild(linkimg);
        
                        copy_linkbtn.addEventListener('click', (event)=>{
                            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                                if (tabs && tabs[0] && tabs[0].url) {
                                    var url = tabs[0].url;
                                    textInput.value += url + '\n';
                                }
                                else {
                                    textInput.value += "Unable to retrieve URL";
                                }
                            });
                            event.preventDefault();
                        });

                        const cancelbtn = document.createElement('button');
                        cancelbtn.innerHTML = "";
                        cancelbtn.setAttribute("class", "cancelbtn");
                        noteInputDiv.appendChild(cancelbtn);

                        let cancelimg = document.createElement('img');
                        cancelimg.src = '../imgs/cancel.png';
                        cancelbtn.appendChild(cancelimg);

                        cancelbtn.addEventListener('click', (event)=>{
                            clearContainer();
                            viewPinnedNotes();
                            event.preventDefault();
                        });

                    });
                    //********************************************************************************ends here

                    const cpytextbtn = document.createElement("button");
                    cpytextbtn.setAttribute("class", "cpytextbtn");
                    cpytextbtn.innerHTML = "";
                    pinbtnsdiv.appendChild(cpytextbtn);


                    let copyimg = document.createElement('img');
                    copyimg.src = '../imgs/copy.png';
                    cpytextbtn.appendChild(copyimg);

                    cpytextbtn.addEventListener('click', ()=>{
                        navigator.permissions.query({ name: "clipboard-write" }).then((r) => {
                            if (r.state === "granted" || r.state === "prompt") {
                                navigator.clipboard.writeText(textP.innerHTML);
                            }
                          });
                    });

                    const unpinbtn = document.createElement('button');
                    unpinbtn.setAttribute("class", "unpinbtn");
                    unpinbtn.innerHTML = "";
                    pinbtnsdiv.appendChild(unpinbtn);

                    let unpinimg = document.createElement('img');
                    unpinimg.src = '../imgs/office-push-pin.png';
                    unpinbtn.appendChild(unpinimg);

                    unpinbtn.addEventListener('click', ()=>{
                        notesDatabase[i].pinned = false;
                        chrome.storage.local.set({'notesDatabase':notesDatabase});
                        clearContainer();
                        viewPinnedNotes();
                    });
                }
            }
            
        }
    });
}

export{
    viewPinnedNotes
}