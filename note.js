const addNoteBtn = document.querySelector('.js-add-note');
const inputNote = document.querySelector('.inputs');
const submitBtn = document.querySelector('.submitbtn');
const saveEditBtn = document.querySelector('.saveEdit');
const noteArea = document.querySelector('.js-note-area');



noteArea.innerHTML = localStorage.getItem('note');
DeleteNote();
EditNote();
ReadMore();
// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
      .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
          console.error('Service Worker registration failed:', error);
      });
}
addNoteBtn.addEventListener('click', () => {
  inputNote.classList.add('show');
  addNoteBtn.classList.add('notShow');
  noteArea.classList.add('notShow');
  saveEditBtn.classList.add('notShow');
});

submitBtn.addEventListener('click', () => {
  const titleInput = document.querySelector('.inputForTitle');
  const noteInput = document.querySelector('.inputForNote');

  getNote(titleInput, noteInput);
  inputNote.classList.toggle('show');
  addNoteBtn.classList.toggle('notShow');
  noteArea.classList.toggle('notShow');
});

function getNote(titleInput, noteInput) {
  const title = titleInput.value.trim().replace(/\s+/g, '-');
  const displayTitle = title.replace(/-/g,' ');
  const note = noteInput.value.trim();

  if (title !== '' && note !== '') {
    let noteHtml = `
      <div class="note js-note-${title}" data-note-id="${title}">
        <div class="head">
          <h2 class="title js-title-${title}">${displayTitle}</h2>
          <div>
            <button class="editBtn" data-note-id="${title}">edit</button>
            <button class="deleteBtn" data-note-id="${title}">X</button>
          </div>
        </div>
        <p class="note-body js-noteBody-${title}">${note}</p>`;
    if (note.length > 50) {
      noteHtml += `<a href="#" class="readMore js-readMore-${title}" data-note-id="${title}">Read More</a>`;
    }

    noteHtml += `</div>`;
    

    titleInput.value = '';
    noteInput.value = '';

    const mainContainer = document.querySelector('.js-note-area');
    mainContainer.innerHTML += noteHtml;

    SaveToStorage(mainContainer.innerHTML);
    DeleteNote();
    EditNote();
    ReadMore();
  }
}

function SaveToStorage(notesHtml) {
  localStorage.setItem('note', notesHtml);
}

function DeleteNote() {
  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.noteId;
      const noteContainer = document.querySelector(`.js-note-${title}`);
      noteContainer.remove();
      SaveToStorage(document.querySelector('.js-note-area').innerHTML);
    });
  });
}

function EditNote() {
  document.querySelectorAll('.editBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.noteId;
      const noteTitle = document.querySelector(`.js-title-${title}`);
      const noteBody = document.querySelector(`.js-noteBody-${title}`);
      const noteContainer = document.querySelector(`.js-note-${title}`);

      const titleInput = document.querySelector('.inputForTitle');
      const noteInput = document.querySelector('.inputForNote');
      titleInput.value = noteTitle.textContent;
      noteInput.value = noteBody.textContent;

      inputNote.classList.add('show');
      addNoteBtn.classList.add('notShow');
      noteArea.classList.add('notShow');
      submitBtn.classList.add('notShow');
      saveEditBtn.classList.remove('notShow');

    saveEditBtn.addEventListener('click', () => {
      const newTitle = titleInput.value.trim().replace(/\s+/g, '-');
      const displayTitle = newTitle.replace(/-/g,' ');
      const newNote = noteInput.value.trim();

      let updatedNoteHtml = `
        <div class="note js-note-${newTitle}" data-note-id="${newTitle}">
          <div class="head">
            <h2 class="title js-title-${newTitle}">${displayTitle}</h2>
            <div>
              <button class="editBtn" data-note-id="${newTitle}">edit</button>
              <button class="deleteBtn" data-note-id="${newTitle}">X</button>
            </div>
          </div>
          <p class="note-body js-noteBody-${newTitle}">${newNote}</p>`;
          if (newNote.length > 50) {
            updatedNoteHtml += `<a href="#" class="readMore js-readMore-${title}" data-note-id="${title}">Read More</a>`;
          }
      
          updatedNoteHtml += `</div>`;
      


      noteContainer.outerHTML = updatedNoteHtml;
      titleInput.value = '';
      noteInput.value = '';

      inputNote.classList.toggle('show');
      addNoteBtn.classList.toggle('notShow');
      noteArea.classList.toggle('notShow');
      submitBtn.classList.remove('notShow');

      
      SaveToStorage(document.querySelector('.js-note-area').innerHTML);
      DeleteNote();
      EditNote();
      ReadMore();
    });

    });
  });
}

function ReadMore(){
  document.querySelectorAll('.readMore').forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      const readContainer = document.querySelector('.readMore-container');
      readContainer.style.display = "block";
      const title = btn.dataset.noteId;
      const noteTitle = document.querySelector(`.js-title-${title}`);
      const noteBody = document.querySelector(`.js-noteBody-${title}`);

      const readTitle = document.querySelector('.js-readTitle');
      const readNote = document.querySelector('.js-readNote');
      readTitle.textContent = noteTitle.textContent;
      readNote.textContent = noteBody.textContent;

      document.querySelector('.closeBtn')
        .addEventListener('click',()=>{
          readContainer.style.display = "none";
        })

      
    });
  });
}