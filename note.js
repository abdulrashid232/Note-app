
const addNoteBtn = document.querySelector('.js-add-note');
const inputNote = document.querySelector('.inputs');
const submitBtn = document.querySelector('.submitbtn');
const noteArea = document.querySelector('.js-note-area');


noteArea.innerHTML = localStorage.getItem('note');
DeleteNote();
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

function getNote(titleInput,noteInput) {


  const title = titleInput.value.trim();
  const note = noteInput.value.trim();

  if (title !== '' && note !== '') {
    const noteHtml = `
      <div class="note js-note" data-note-id="${title}">
        <div class="head">
          <h2 class="title" data-note-title-id="${title}">${title}</h2>
          <div>
            <button class="deleteBtn" data-note-id="${title}">X</button>
            <button class="editBtn">edit</button>
          </div>
        </div>
        <p class="note-body" data-note-id="${title}">${note}</p>
        <a href="#">Read More</a>
      </div>
    `;

    titleInput.value = '';
    noteInput.value = '';

    const mainContainer = document.querySelector('.js-note-area');
    mainContainer.innerHTML += noteHtml;

    SaveToStorage(mainContainer.innerHTML);
    DeleteNote();
    EditNote();
  }
}

function SaveToStorage(notesHtml) {
  localStorage.setItem('note', notesHtml);
}

function DeleteNote() {
  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.noteId;
      const noteContainer = document.querySelector(`[data-note-id="${title}"]`);
      noteContainer.remove();
      SaveToStorage(document.querySelector('.js-note-area').innerHTML);
    });
  });
}

function EditNote(){
  document.querySelectorAll('.editBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.noteId;
      const noteTitle = document.querySelector(`[data-note-title-id="${title}"]`);
      const titleInput = document.querySelector('.inputForTitle');
      const noteInput = document.querySelector('.inputForNote');
      const newTitle = titleInput.value.trim();
      const note = noteInput.value.trim();
      console.log(newTitle);
      // console.log(noteTitle.textContent);
      inputNote.classList.add('show');
      addNoteBtn.classList.add('notShow');
      noteArea.classList.add('notShow');
      // SaveToStorage(document.querySelector('.js-note-area').innerHTML);
    });
  });
}