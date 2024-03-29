/*
Model. Handles storage and access to other APIs
*/

//add listener. Listens for messages sent from the content.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "saveNote") {
      let note = message.note;
      let editingNoteIndex = message.index;
      
      let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

      //Update Note Array as it's being edited.
      if (editingNoteIndex !== null) {
          notes[editingNoteIndex] = note;
          editingNoteIndex = null;
      } else {
          notes.push(note);
      }

      localStorage.setItem('notes', JSON.stringify(notes));
      // Send a message back to content.js to trigger UI update if needed
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "updateUI" });
      });
  }
});