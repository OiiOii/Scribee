//Import addNote
const { addNote } = require('../scripts/addNote.js');
const { note } = require('../scripts/note.js');

const testTitle = 'HI TEST TITLE';
const testText = 'HI TEST TEXT';
const testDate = '2010-08-08';

// Mock the chrome storage API
const get = jest.fn();
const set = jest.fn();

global.chrome = {
    storage: {
        local: {
            set,
            get
        }
    }
};

describe('addNote', () => {
    test('adds a note to the storage', () => {
        // Mock data
        const mockNote = new note(testTitle, testText, testDate);
    
        // Mock Chrome storage get method
        global.chrome.storage.local.get.mockImplementationOnce((_, callback) => {
            callback({ notesDatabase: [] });
        });
    
        // Call the function
        addNote(testTitle, testText, testDate);
    
        // Expectations
        expect(global.chrome.storage.local.set).toHaveBeenCalledWith({
            notesDatabase: [expect.objectContaining(mockNote)] // Ensure that the new note is present in the database
        }, expect.any(Function)); // Ensure that the second argument is a function
    });
});