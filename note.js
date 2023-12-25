const addNoteBtn = document.querySelector('.js-add-note');
const inputNote = document.querySelector('.inputs');

addNoteBtn.addEventListener('click',()=>{
  inputNote.classList.add('show');
  addNoteBtn.classList.add('notShow');
})