document.getElementById('save-button').addEventListener('click', saveNote);

let noteIndex = null;

function saveNote(){

  //Retrieve the VALUE of the note body.
  let noteBody = document.getElementById('note-body').value;
  let note = {body: noteBody};

  chrome.runtime.sendMessage({ action: "saveOrUpdateNote", note: note, index: editingNoteIndex });
}