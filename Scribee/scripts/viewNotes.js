import { note } from "./note.js";
import { clearContainer } from "./frontPage.js";
import { voicetoText } from "./voice.js";

const container = document.querySelector('.container');


function viewNotes(){

    chrome.storage.local.get({'notesDatabase':[]}, function(result){

        let notesDatabase = result.notesDatabase;
        const container = document.querySelector('.container');

        if(typeof notesDatabase === 'undefined'){
            chrome.storage.local.set({'notesDatabase': list});
        }

        if(notesDatabase?.length === 0){
            
            const noNotesMessage  = document.createElement('p');
            noNotesMessage.setAttribute("class", "noNotesMessage");
            noNotesMessage.innerHTML = "Start writing notes to display them here!";
            container.appendChild(noNotesMessage);

        }else{
            //console.log(notesDatabase);
            for(let i = 0; i < notesDatabase.length; i++){
                const noteCard = document.createElement('div');
                noteCard.setAttribute("class", "noteCard");
                container.appendChild(noteCard);
                
                const titleP = document.createElement('p');
                titleP.setAttribute("class", "titleP");
                if(notesDatabase[i].title.length > 11){
                    titleP.innerHTML = notesDatabase[i].title.substring(0,11) + "...";
                }
                else{
                    titleP.innerHTML = notesDatabase[i].title;
                }
                //titleP.innerHTML = notesDatabase[i].title;
                noteCard.appendChild(titleP);

                const textP = document.createElement('p');
                textP.setAttribute("class", "textP");
                textP.innerHTML = notesDatabase[i].date;
                noteCard.appendChild(textP);

                const editbtn = document.createElement('button');
                editbtn.setAttribute("class", "editbtn");
                editbtn.innerHTML = "";
                noteCard.appendChild(editbtn);


                let editimg = document.createElement('img');
                editimg.src = '../imgs/edit.png';
                editbtn.appendChild(editimg);

                //Copied almost all the edit btn event listener code
                //from the frontpage.js showNoteInput() function
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
                    //textInput.setAttribute("type", "text");
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
                        notesDatabase[i] = new note(titleInput.value, textInput.value, dateAndTimeString, notesDatabase[i].pinned);
                        chrome.storage.local.set({'notesDatabase':notesDatabase});
                        clearContainer();
                        viewNotes();
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

                    const cancelbtn = document.createElement('button');
                    cancelbtn.innerHTML = "";
                    cancelbtn.setAttribute("class", "cancelbtn");
                    noteInputDiv.appendChild(cancelbtn);

                    let cancelimg = document.createElement('img');
                    cancelimg.src = '../imgs/cancel.png';
                    cancelbtn.appendChild(cancelimg);

                    cancelbtn.addEventListener('click', (event)=>{
                        clearContainer();
                        viewNotes();
                        event.preventDefault();
                    });

                });

                const pinnedbtn = document.createElement('button');
                pinnedbtn.setAttribute("class", "pinnedbtn");
                pinnedbtn.innerHTML = "";
                noteCard.appendChild(pinnedbtn);

                let pinimg = document.createElement('img');
                pinimg.src = '../imgs/office-push-pin.png';
                pinnedbtn.appendChild(pinimg);

                pinnedbtn.addEventListener('click', (event)=>{
                    if(notesDatabase[i].pinned == false || notesDatabase[i].pinned  == undefined){
                        notesDatabase[i].pinned = true;
                    }
                    else{
                        notesDatabase[i].pinned = false;
                    }
                    chrome.storage.local.set({'notesDatabase':notesDatabase});
                });


                const deletebtn = document.createElement("button");
                deletebtn.setAttribute("class", "deletebtn");
                deletebtn.innerHTML = "";
                noteCard.appendChild(deletebtn);

                let deleteimg = document.createElement('img');
                deleteimg.src = '../imgs/delete.png';
                deletebtn.appendChild(deleteimg);

                deletebtn.addEventListener('click', (event)=>{
                    let deleteIndex = notesDatabase.indexOf(notesDatabase[i]);
                    notesDatabase.splice(deleteIndex, 1);
                    chrome.storage.local.set({'notesDatabase':notesDatabase});
                    clearContainer();
                    viewNotes();
                });
            }
        }
    });
}

export{
    viewNotes
};