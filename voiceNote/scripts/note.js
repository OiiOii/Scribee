
class note{

    constructor(title, text, date){
        this.title = title;
        this.text = text;
        this.date = date;
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

    set setTitle(newTitle){
        this.tite = newTitle;
    }

    set setText(newText){
        this.text = text;
    }

    set setDate(newDate){
        this.date = newDate;
    }

}

export{
    note
};