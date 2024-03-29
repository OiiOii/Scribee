import { note } from "./note.js";
import { clearContainer } from "./frontPage.js";

const container = document.querySelector('.container');
function clearcontain(){
    container.innerHTML = "";
}

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
            noNotesMessage.innerHTML = "start writing notes to display them here!";
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
                editbtn.innerHTML = "edit";
                noteCard.appendChild(editbtn);

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
                    savebtn.innerHTML = "save";
                    noteInputDiv.appendChild(savebtn);

                    savebtn.addEventListener('click', (event)=>{
                        notesDatabase[i] = new note(titleInput.value, textInput.value, dateAndTimeString);
                        chrome.storage.local.set({'notesDatabase':notesDatabase});
                        clearContainer();
                        viewNotes();
                        event.preventDefault();
                    });    

                    const voicebtn = document.createElement('button');
                    voicebtn.innerHTML = "voice";
                    noteInputDiv.appendChild(voicebtn);

                    const cancelbtn = document.createElement('button');
                    cancelbtn.innerHTML = "cancel";
                    noteInputDiv.appendChild(cancelbtn);

                    cancelbtn.addEventListener('click', (event)=>{
                        clearContainer();
                        viewNotes();
                        event.preventDefault();
                    });

                });


                const deletebtn = document.createElement("button");
                deletebtn.setAttribute("class", "deletebtn");
                deletebtn.innerHTML = "delete";
                noteCard.appendChild(deletebtn);

                /*let deleteimg = document.createElement('img');
                deleteimg.src = '../imgs/mic.png';
                deletebtn.appendChild(deleteimg);*/

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