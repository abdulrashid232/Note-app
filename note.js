const addNoteBtn = document.querySelector('.js-add-note');
const inputNote = document.querySelector('.inputs');
const submitBtn = document.querySelector('.submitbtn');
const noteArea = document.querySelector('.js-note-area');

noteArea.innerHTML = localStorage.getItem('note');

addNoteBtn.addEventListener('click',()=>{
  inputNote.classList.add('show');
  addNoteBtn.classList.add('notShow');
  noteArea.classList.add('notShow');
});

submitBtn.addEventListener('click',()=>{
  const titleInput = document.querySelector('.inputForTitle');
  const noteInput = document.querySelector('.inputForNote');


  getNote(titleInput, noteInput);
  inputNote.classList.toggle('show');
  addNoteBtn.classList.toggle('notShow');
  noteArea.classList.toggle('notShow');
  
  
});

function getNote(titleInput,noteInput){

  const title = titleInput.value
  const note = noteInput.value
  if (title.trim() !== '' && note.trim() !== '') {
    const noteHtml = `
      <div class="note js-note-${title}" data-note-id="${title}">
       <div class="head">
        <h2 class="title">${title}</h2>
        <div>
          <button class="deleteBtn" data-note-id="${title}">X</button>
          <button class="editBtn">edit</button>
        </div>
       </div>
        <p class="note-body">${note}</p>
        <a href="#">Read More</a>
      </div>
    `;

    titleInput.value = '';
    noteInput.value = '';

    const mainContainer = document.querySelector('.js-note-area');
    mainContainer.innerHTML += noteHtml;

    SaveToStorage(mainContainer.innerHTML);
    DeleteNote(mainContainer)
  
  }
  
  
}


function SaveToStorage(notesHtml){
  localStorage.setItem('note',notesHtml)
}


function DeleteNote(mainContainer){
document.querySelectorAll('.deleteBtn')
  .forEach((btn)=>{
    
    btn.addEventListener('click',()=>{
      const title = btn.dataset.noteId;
      const noteContainer =document.querySelector(`.js-note-${title}`);
      mainContainer.remove(noteContainer);
      SaveToStorage(mainContainer.innerHTML)
      console.log(noteContainer)
    });
  });
 
}
