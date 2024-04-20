import { clearContainer } from "./frontPage.js";
import { voicetoText } from "./voice.js";

function viewPinnedNotes(desc){
    //storage for the database
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
            //fill in the notes divs with data if available from database
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

                    //Edit feature copy pasted from viewNotes
                    const editbtn = document.createElement('button');
                    editbtn.setAttribute("class", "pinnededitbtn");
                    editbtn.innerHTML = "";
                    pinbtnsdiv.appendChild(editbtn);
 
 
                    let editimg = document.createElement('img');
                    editimg.src = '../imgs/edit.png';
                    editbtn.appendChild(editimg);
 
                    editbtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Edit Notes";});
                    editbtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

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
                            viewPinnedNotes(desc);
                            event.preventDefault();
                        });    
                        savebtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Save Notes";});
                        savebtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
 
                        const voicebtn = document.createElement('button');
                        voicebtn.setAttribute("class", "voicebtn");
                        voicebtn.innerHTML = "";
                        noteInputDiv.appendChild(voicebtn);
 
                        let micimg = document.createElement('img');
                        micimg.src = '../imgs/mic.png';
                        voicebtn.appendChild(micimg);
                     
                        voicebtn.addEventListener('click', (event)=>{
                            voicetoText(textInput, desc);
                            event.preventDefault();
                     
                        });
                        voicebtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Record";});
                        voicebtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
 
                        const copylinkbtn = document.createElement('button');
                        copylinkbtn.setAttribute("class", "copy-link-btn");
                        copylinkbtn.innerHTML = "";
                        noteInputDiv.appendChild(copylinkbtn);
 
                        let linkimg = document.createElement('img');
                        linkimg.src = '../imgs/copy-link.png';
                        copylinkbtn.appendChild(linkimg);
         
                        copylinkbtn.addEventListener('click', (event)=>{
                            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                                if (tabs && tabs[0] && tabs[0].url) {
                                    var url = tabs[0].url;
                                    textInput.value += url + '\n';
                                }
                                else {
                                    desc.innerHTML = "Unable to retrieve URL";
                                }
                            });
                            event.preventDefault();
                        });
                        copylinkbtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Copy URL";});
                        copylinkbtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
 
                        const cancelbtn = document.createElement('button');
                        cancelbtn.innerHTML = "";
                        cancelbtn.setAttribute("class", "cancelbtn");
                        noteInputDiv.appendChild(cancelbtn);
 
                        let cancelimg = document.createElement('img');
                        cancelimg.src = '../imgs/cancel.png';
                        cancelbtn.appendChild(cancelimg);
 
                        cancelbtn.addEventListener('click', (event)=>{
                            clearContainer();
                            viewPinnedNotes(desc);
                            event.preventDefault();
                        });
                        cancelbtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Cancel";});
                        cancelbtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
 
                    });
                    //End of Edit Note

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
                    cpytextbtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Copy Note Contents";});
                    cpytextbtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

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
                    unpinbtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Unpin Note";});
                    unpinbtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
                }
            }
            
        }
    });
}

export{
    viewPinnedNotes
}