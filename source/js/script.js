'use strict';

let columnIdCounter = 4;

document
.querySelectorAll('.column')
.forEach(columnProcess);

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', event => {

        let columnElement = document.createElement('div');
        columnElement.classList.add('column');
        columnElement.setAttribute('draggable', 'true');
        columnElement.dataset.columnId = columnIdCounter++;

        columnElement.innerHTML = `<p class="column-header" contenteditable="true">В плане</p>
                                    <div data-notes></div>
                                    <p class="column-footer">
                                        <span data-action-addNote class="action">+ Добавить карточку</span>
                                    </p>`;

        document.querySelector('.columns').append(columnElement);
        columnProcess(columnElement);
    });

document
    .querySelectorAll('.note')
    .forEach(Note.process);




function columnProcess(columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')

    spanAction_addNote.addEventListener('click', event => {
        let noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.dataset.noteId = Note.idCounter++;

        columnElement.querySelector('[data-notes]').append(noteElement);
        Note.process(noteElement);

        noteElement.setAttribute('contenteditable', 'true');
        noteElement.focus();
    });

    let columnHeader = columnElement.querySelector('.column-header')
    columnHeader.addEventListener('dblclick', event => {
        columnHeader.setAttribute('contenteditable', 'true');
        columnHeader.focus();
    });
    columnHeader.addEventListener('blur', event => {
        columnHeader.removeAttribute('conteneditable');
    });

    columnElement.addEventListener('dragover', dragover_columnHandler);
    columnElement.addEventListener('drop', drop_columnHandler);
}

function dragover_columnHandler(event) {
    event.preventDefault();
}

function drop_columnHandler(event) {
    if (Note.dragged) {
        return this.querySelector('[data-notes]').append(Note.dragged);
    }
}



