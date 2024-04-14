
class note{

    constructor(title, text, date, pinned){
        this.title = title;
        this.text = text;
        this.date = date;
        this.pinned  = pinned;
    }

    get getTitle(){
        return this.title;
    }

    get getText(){
        return this.text;
    }

    get getDate(){
        return this.date;
    }

    get getPinned(){
        return this.pinned;
    }

    set setTitle(newTitle){
        this.tite = newTitle;
    }

    set setText(newText){
        this.text = text;
    }

    set setDate(newDate){
        this.date = newDate;
    }

    set setPinned(newPinned){
        this.pinned = pinned;
    }

}

export{
    note
};