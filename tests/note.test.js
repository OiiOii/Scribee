//Import Note
const { note } = require('../scripts/note.js');

const testTitle = 'HI TEST TITLE';
const testText = 'HI TEST TEXT';
const testDate = '2010-08-08';

const newTitle = 'This is the new title';
const newText = 'Just putting w/e in for test';
const newDate = '2050-05-05';

describe('note class', () => {
    //Test Constructor
    test('Constructor creates note obj', () => {
        const testNote = new note(testTitle, testText, testDate, true);
        expect(testNote.title).toBe(testTitle);
        expect(testNote.text).toBe(testText);
        expect(testNote.date).toBe(testDate);
        expect(testNote.pinned).toBe(true);
    });

    //Test Getters
    test('getters are working as intended', () => {
        const testNote = new note(testTitle, testText, testDate, true);
        expect(testNote.getTitle).toBe(testTitle);
        expect(testNote.getText).toBe(testText);
        expect(testNote.getDate).toBe(testDate);
        expect(testNote.getPinned).toBe(true);
    });

    //Test Setters
    test('setters working as intended', () => {
        const testNote = new note(testTitle, testText, testDate, true);
        testNote.setTitle = newTitle;
        testNote.setText = newText;
        testNote.setDate = newDate;
        testNote.setPinned = false;
        expect(testNote.title).toBe(newTitle);
        expect(testNote.text).toBe(newText);
        expect(testNote.date).toBe(newDate);
        expect(testNote.pinned).toBe(false);
    });
});