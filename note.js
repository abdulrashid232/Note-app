const addNoteBtn = document.querySelector('.js-add-note');
const inputNote = document.querySelector('.inputs');
const submitBtn = document.querySelector('.submitbtn');
const noteArea = document.querySelector('.js-note-area');

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
  let noteHtml = '';

  const title = titleInput.value
  const note = noteInput.value
  noteHtml = `
  <div class="note">
  <h2 class="title">${title}</h2>
  <p class="note-body">${note}</p>
  <a href="#">Read More</a>
</div>
  `
  
  titleInput.value = '';
  noteInput.value = '';
  
  const mainContainer = document.querySelector('.js-note-area');

  mainContainer.innerHTML += noteHtml;

}

