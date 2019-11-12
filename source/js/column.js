const Column = {
    idCounter: 4,
    dragged: null,

    process(columnElement) {
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
    
        columnElement.addEventListener('dragstart', Column.dragstart);
        columnElement.addEventListener('dragend', Column.dragend);
        columnElement.addEventListener('dragenter', Column.dragenter);
        columnElement.addEventListener('dragover', Column.dragover);
        columnElement.addEventListener('dragleave', Column.dragleave);
        columnElement.addEventListener('drop', Column.drop);
    },
    

    dragstart(event) {
        if(!Column.dragged) return;
        Column.dragged = this;
        this.classList.add('dragged');
        console.log(Column.dragged);
    },

    dragend(event) {
        Column.dragged = null;
        this.classList.remove('dragged');
    },

    dragenter (event) {
        if (this === Column.dragged) return;
        this.classList.add('under');
    },

    dragover(event) {
        if(this === Column.dragged || !Column.dragged) return;
        console.log(this === Column.dragged);
        event.preventDefault();
    },

    dragleave (event) {
        if ( this.closest('.column') === Column.dragged || Column.dragged ) return;
        this.classList.remove('under');
    },
    
    drop(event) {
        if (this === Column.dragged || !Column.dragged) return;
        if (Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged);
        }
    }
}