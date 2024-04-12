import { clearContainer } from "./frontPage.js";

function viewPinnedNotes(){
    chrome.storage.local.get({'notesDatabase':[]}, function(result){

        let notesDatabase = result.notesDatabase;
        const container = document.querySelector('.container');

        if(typeof notesDatabase === 'undefined'){
            chrome.storage.local.set({'notesDatabase': list});
        }

        if(notesDatabase?.length === 0){
            
            const noNotesMessage  = document.createElement('p');
            noNotesMessage.setAttribute("class", "noNotesMessage");
            noNotesMessage.innerHTML = "Write notes and pin them to display here!";
            container.appendChild(noNotesMessage);

        }else{
            
            for(let i = 0; i < notesDatabase.length; i++){
                if(notesDatabase[i].pinned == true){
                    const pinnoteCard = document.createElement('div');
                    pinnoteCard.setAttribute("class", "pinnoteCard");
                    container.appendChild(pinnoteCard);

                    const titleP = document.createElement('p');
                    titleP.setAttribute("class", "pintitleP");
                    
                    titleP.innerHTML = notesDatabase[i].title;
                    
                    pinnoteCard.appendChild(titleP);

                    const textP = document.createElement('p');
                    textP.setAttribute("class", "pintextP");
                    textP.innerHTML = notesDatabase[i].text;
                    pinnoteCard.appendChild(textP);

                    const dateP = document.createElement('p');
                    dateP.setAttribute("class", "pindateP");
                    dateP.innerHTML = notesDatabase[i].date;
                    pinnoteCard.appendChild(dateP);

                    const pinbtnsdiv = document.createElement('div');
                    pinbtnsdiv.setAttribute("class", "pinbtnsdiv");
                    pinnoteCard.appendChild(pinbtnsdiv);

                    const cpytextbtn = document.createElement("button");
                    cpytextbtn.setAttribute("class", "cpytextbtn");
                    cpytextbtn.innerHTML = "";
                    pinbtnsdiv.appendChild(cpytextbtn);


                    let copyimg = document.createElement('img');
                    copyimg.src = '../imgs/copy.png';
                    cpytextbtn.appendChild(copyimg);

                    cpytextbtn.addEventListener('click', ()=>{
                        navigator.permissions.query({ name: "clipboard-write" }).then((r) => {
                            if (r.state === "granted" || r.state === "prompt") {
                                navigator.clipboard.writeText(textP.innerHTML);
                            }
                          });
                    });

                    const unpinbtn = document.createElement('button');
                    unpinbtn.setAttribute("class", "unpinbtn");
                    unpinbtn.innerHTML = "";
                    pinbtnsdiv.appendChild(unpinbtn);

                    let unpinimg = document.createElement('img');
                    unpinimg.src = '../imgs/office-push-pin.png';
                    unpinbtn.appendChild(unpinimg);

                    unpinbtn.addEventListener('click', ()=>{
                        notesDatabase[i].pinned = false;
                        chrome.storage.local.set({'notesDatabase':notesDatabase});
                        clearContainer();
                        viewPinnedNotes();
                    });
                }
            }
            
        }
    });
}

export{
    viewPinnedNotes
}