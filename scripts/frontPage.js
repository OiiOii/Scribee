import { addNote } from "../scripts/addNote.js";
import { viewNotes } from "../scripts/viewNotes.js";
import { viewPinnedNotes } from "../scripts/pinnedNotes.js";
import { voicetoText } from "./voice.js";


const container = document.querySelector('.container');
const desc = document.querySelector('.button-description');

//Buttons for adding notes and showing description when hovering
//Refactored to deal with Null cases
const addNoteBtn = document.querySelector('.add-note-btn');
if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => {
        clearContainer();
        showNoteInput();
    });
    const addNoteHoverEnter = addNoteBtn.addEventListener('mouseenter', () => { desc.innerHTML = "Add Note"; });
    const addNoteHoverLeave = addNoteBtn.addEventListener('mouseleave', () => { desc.innerHTML = "-"; });
}

// const addNotebtn = document.querySelector('.add-note-btn').addEventListener('click', ()=>{
//     clearContainer();
//     showNoteInput();
// });
// const addNoteHoverEnter = document.querySelector('.add-note-btn').addEventListener('mouseenter', ()=>{desc.innerHTML = "Add Note";});
// const addNoteHoverLeave = document.querySelector('.add-note-btn').addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

//Buttons for viewing notes and showing description when hovering
//Refactored to deal with Null cases
const viewNotesBtn = document.querySelector('.view-notes-btn');
if (viewNotesBtn) {
    viewNotesBtn.addEventListener('click', () => {
        clearContainer();
        viewNotes(desc);
    });
    const viewNoteHoverEnter = viewNotesBtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "View Notes";});
    const viewNoteHoverLeave = viewNotesBtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
}

// const viewNotesbtn = document.querySelector('.view-notes-btn').addEventListener('click', ()=>{
//     clearContainer();
//     viewNotes(desc);
// });
// const viewNoteHoverEnter = document.querySelector('.view-notes-btn').addEventListener('mouseenter', ()=>{desc.innerHTML = "View Notes";});
// const viewNoteHoverLeave = document.querySelector('.view-notes-btn').addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

//Buttons for pinning notes and showing description when hovering
//Refactored to deal with Null cases
const pinnedNotesBtn = document.querySelector('.pinned-notes-btn');
if (pinnedNotesBtn) {
    pinnedNotesBtn.addEventListener('click', () => {
        clearContainer();
        viewPinnedNotes(desc);
    });
    const pinNoteHoverEnter = pinnedNotesBtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Pinned Notes";});
    const pinNoteHoverLeave = pinnedNotesBtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});
}

// const pinnedNotesbtn = document.querySelector('.pinned-notes-btn').addEventListener('click', ()=>{
//     clearContainer();
//     viewPinnedNotes(desc);
// });
// const pinNoteHoverEnter = document.querySelector('.pinned-notes-btn').addEventListener('mouseenter', ()=>{desc.innerHTML = "Pinned Notes";});
// const pinNoteHoverLeave = document.querySelector('.pinned-notes-btn').addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

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

    //URL Extraction Button & Feature
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
                textInput.value += "URL: " + url + '\n';
            }
            else {
                desc.innerHTML = "Unable to retrieve URL";
            }
        });
        event.preventDefault();
    });

    copylinkbtn.addEventListener('mouseenter', ()=>{desc.innerHTML = "Copy URL";});
    copylinkbtn.addEventListener('mouseleave', ()=>{desc.innerHTML = "-";});

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

