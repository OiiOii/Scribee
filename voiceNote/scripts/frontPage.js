import { addNote } from "../scripts/addNote.js";
import { viewNotes } from "../scripts/viewNotes.js";
import { voicetoText } from "./voice.js";

const container = document.querySelector('.container');

const addNotebtn = document.querySelector('.add-note-btn').addEventListener('click', ()=>{
    clearContainer();
    showNoteInput();
});

const viewNotesbtn = document.querySelector('.view-notes-btn').addEventListener('click', ()=>{
    clearContainer();
    viewNotes();
});

const pinnedNotesbtn = document.querySelector('.pinned-notes-btn');

//viewNotes();

function clearContainer(){
    container.innerHTML = "";
}

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
    
    const savebtn = document.createElement('button');
    savebtn.innerHTML = "save";
    noteInputDiv.appendChild(savebtn);

    savebtn.addEventListener('click', (event)=>{
        addNote(titleInput.value, textInput.value, dateAndTimeString);
        clearContainer();
        //viewNotes();
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
    cancelbtn.innerHTML = "cancel";
    noteInputDiv.appendChild(cancelbtn);

    cancelbtn.addEventListener('click', (event)=>{
        clearContainer();
        //viewNotes();
        event.preventDefault();
    });
}


export{
    clearContainer
};

