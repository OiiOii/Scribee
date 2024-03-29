import { note } from "../scripts/note.js";


function addNote(title, text, date){
    const newNote = new note(title, text, date);

    /*chrome.storage.local.get('notesDatabase', function(result){
        let data = result.data;
        console.log(data);
        if(typeof data === 'undefined'){
            chrome.storage.local.set({'notesDatabase': []});
        }
        result.push(newNote);
        console.log(result);
    });*/


    chrome.storage.local.get({'notesDatabase':[]}, function(result){
        let notesDatabase = result.notesDatabase;
        if(typeof notesDatabase === 'undefined'){
            chrome.storage.local.set({'notesDatabase': list});
        }
        //notesDatabase.unshift(newNote);
        notesDatabase.push(newNote);
        chrome.storage.local.set({'notesDatabase':notesDatabase},function(){
            chrome.storage.local.get('notesDatabase', function(result){
                //console.log(result.notesDatabase);
            });
        });
    });
    
}

export {
    addNote
};