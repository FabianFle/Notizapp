let titles = [];
let notes = [];

let archiveTitles = [];
let archiveNotes = [];

load();

/*######################################################################################################*/
/*######################################################################################################*/

/*Notizen abschicken*/
function noteSend() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;
    titles.push(title);
    notes.push(note);

    saveNotes();
    render()
}

/*######################################################################################################*/
/*######################################################################################################*/

/*Notizen lessen*/
function render() {
    let myposts = document.getElementById('myposts');
    myposts.innerHTML = '';
    for (let i = 0; i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];
        myposts.innerHTML += `
        <div class="post">
                 <b>${titles[i]}</b>
                 <b>${notes[i]}</b>
                 
                    <div class="noteSetting">
                    <img src="img/müll.png" onclick="deletNote(${i})" class="imgGarbage">
                    <img src="img/archive.png" onclick="archiveNote(${i})" class="imgarchive">
                    </div>
            </div> 
            `;
    }
    document.getElementById('note').value = '';
    document.getElementById('title').value = '';
}

/*######################################################################################################*/
/*######################################################################################################*/

/*Notiz feld kontrollieren*/
function noteControl() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (title == '' || note == '') {
        alert("Das Feld -Title- & -Notiz- müssen ausgefüllt sein.")
    } else {
        noteSend()
    }
}

/*######################################################################################################*/
/*######################################################################################################*/

/*DarkMode einschalten und ausschalten*/
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

/*######################################################################################################*/
/*######################################################################################################*/

/*Notizen Sichern*/
function saveNotes() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);

    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);

    let archiveTitlesAsText = JSON.stringify(archiveTitles);
    localStorage.setItem('archiveTitles', archiveTitlesAsText);

    let archiveNotesAsText = JSON.stringify(archiveNotes);
    localStorage.setItem('archiveNotes', archiveNotesAsText);
}

/*######################################################################################################*/
/*######################################################################################################*/

/*Notizen Laden*/
function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    let archiveTitlesAsText = localStorage.getItem('archiveTitles');
    let archiveNotesAsText = localStorage.getItem('archiveNotes');

    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
    if (archiveTitlesAsText && archiveNotesAsText) {
        archiveTitles = JSON.parse(archiveTitlesAsText);
        archiveNotes = JSON.parse(archiveNotesAsText);
    }
}

/*######################################################################################################*/
/*######################################################################################################*/

/*Notizen Löschen*/
function deletNote(i) {
    titles.splice(i, 1);
    notes.splice(i, 1);
    
    render();
    saveNotes();
}

function deletArchiveNote(i) {
    archiveTitles.splice(i, 1);
    archiveNotes.splice(i, 1);

    saveNotes();
    archiveRender();
}

/*######################################################################################################*/
/*######################################################################################################*/

/*Notizen Archivieren*/
function archiveNote(i) {
    archiveTitles.push(titles[i]);
    archiveNotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    saveNotes();
}

function restoreNote(i) {
    titles.push(archiveTitles[i]);
    notes.push(archiveNotes[i]);
    archiveTitles.splice(i, 1);
    archiveNotes.splice(i, 1);

    render();
    saveNotes();
    archiveRender()
}

function hideArchiveNote() {
    var element = document.getElementById("hideArchiveNote");
  element.classList.remove("hideArchiveNote");
}

function hideArchive() {
    var element = document.getElementById("hideArchiveNote");
  element.classList.add("hideArchiveNote");
}

function archiveRender() {
    let myarchive = document.getElementById('myarchive');
    myarchive.innerHTML = '';
    for (let i = 0; i < archiveNotes.length; i++) {
        myarchive.innerHTML += `
        <div class="post">
                 <b>${archiveTitles[i]}</b>
                 <b>${archiveNotes[i]}</b>
                 
                    <div class="noteSetting">
                    <img src="img/müll.png" onclick="deletArchiveNote(${i})" class="imgGarbage">
                    <img src="img/restore.png" onclick="restoreNote(${i})" class="imgarchive">
                    </div>
            </div> 
            `;
    }
    hideArchiveNote()
}

/*######################################################################################################*/
/*######################################################################################################*/
