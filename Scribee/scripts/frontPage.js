import { addNote } from "../scripts/addNote.js";
import { viewNotes } from "../scripts/viewNotes.js";
import { viewPinnedNotes } from "../scripts/pinnedNotes.js";
import { voicetoText } from "./voice.js";


const container = document.querySelector('.container');
const desc = document.querySelector('.button-description');

//Buttons for adding notes and showing description when hovering
const addNotebtn = document.querySelector('.add-note-btn').addEventListener('click', ()=>{
    clearContainer();
    showNoteInput();
});
const addNoteHoverEnter = document.querySelector('.add-note-btn').addEventListener('mouseenter', ()=>{desc.innerHTML = "Add Note";});
const addNoteHoverLeave = document.querySelector('.add-note-btn').addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

//Buttons for viewing notes and showing description when hovering
const viewNotesbtn = document.querySelector('.view-notes-btn').addEventListener('click', ()=>{
    clearContainer();
    viewNotes();
});
const viewNoteHoverEnter = document.querySelector('.view-notes-btn').addEventListener('mouseenter', ()=>{desc.innerHTML = "View Notes";});
const viewNoteHoverLeave = document.querySelector('.view-notes-btn').addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

//Buttons for pinning notes and showing description when hovering
const pinnedNotesbtn = document.querySelector('.pinned-notes-btn').addEventListener('click', ()=>{
    clearContainer();
    viewPinnedNotes();
});
const pinNoteHoverEnter = document.querySelector('.pinned-notes-btn').addEventListener('mouseenter', ()=>{desc.innerHTML = "Pinned Notes";});
const pinNoteHoverLeave = document.querySelector('.pinned-notes-btn').addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

//sets the current theme if available in storage
const currentTheme = chrome.storage.local.get({'theme':''}, function(result){
    let theme = result.theme;
    if(typeof theme == 'undefined'){
        chrome.storage.local.set({'theme': 'light'});
    }
    else{
        if(theme == 'dark'){
            document.body.classList.toggle('dark');
        }
        else if(theme == 'light'){
            document.body.classList.toggle('light');
        }
    }
});

//Buttons for theme and showing description when hovering
const themebtn = document.querySelector('.theme-btn').addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    let theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    chrome.storage.local.set({'theme': theme});
});
const themeHoverEnter = document.querySelector('.theme-btn').addEventListener('mouseenter', ()=>{desc.innerHTML = "Theme";});
const themeHoverLeave = document.querySelector('.theme-btn').addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

//show note input when the extension is being opened
showNoteInput();

//function to clear the container
function clearContainer(){
    container.innerHTML = "";
}


//function to show the note input to add notes
function showNoteInput(){

    const noteInputDiv = document.createElement('div');
    noteInputDiv.setAttribute("class", "noteInputDiv");
    container.appendChild(noteInputDiv);

    const form = document.createElement('form');
    noteInputDiv.appendChild(form);

    const titleInput = document.createElement('input');
    titleInput.setAttribute("class", "titleInput");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Title");
    form.appendChild(titleInput);

    const textInput = document.createElement('textarea');
    textInput.setAttribute("class", "textInput");
    //textInput.setAttribute("type", "text");
    textInput.setAttribute("placeholder", "Write your note here...");
    form.appendChild(textInput);

    //use this date object to get the day, month, year, hours, and minutes
    const date = new Date();
    const dateAndTimeString = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    

    //Bottom Buttons
    //Save
    const savebtn = document.createElement('button');
    savebtn.setAttribute("class", "savebtn");
    savebtn.innerHTML = "";
    noteInputDiv.appendChild(savebtn);

    let checkimg = document.createElement('img');
    checkimg.src = '../imgs/check.png';
    savebtn.appendChild(checkimg);

    savebtn.addEventListener('click', (event)=>{
        addNote(titleInput.value, textInput.value, dateAndTimeString, false);
        clearContainer();
        showNoteInput();
        event.preventDefault();
    });    

    savebtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Save Notes";});
    savebtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

    //Record
    const voicebtn = document.createElement('button');
    voicebtn.setAttribute("class", "voicebtn");
    voicebtn.innerHTML = "";
    noteInputDiv.appendChild(voicebtn);

    let micimg = document.createElement('img');
    micimg.src = '../imgs/mic.png';
    voicebtn.appendChild(micimg);

    voicebtn.addEventListener('click', (event)=>{
        voicetoText(textInput,desc);
        event.preventDefault();

    });

    voicebtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Record";});
    voicebtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

    //Cancel
    const cancelbtn = document.createElement('button');
    cancelbtn.setAttribute("class", "cancelbtn")
    cancelbtn.innerHTML = "";
    noteInputDiv.appendChild(cancelbtn);

    let cancelimg = document.createElement('img');
    cancelimg.src = '../imgs/cancel.png';
    cancelbtn.appendChild(cancelimg);

    cancelbtn.addEventListener('click', (event)=>{
        clearContainer();
        showNoteInput();
        event.preventDefault();
    });

    cancelbtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Cancel";});
    cancelbtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
}


export{
    clearContainer
};

