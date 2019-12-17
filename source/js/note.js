'use strict';

class Note {
    constructor(id = Note.nextId++, content = 'Какой-то текст', parentId) {
        
        this.id = id;
        
        if( !parentId) {
            parentId = 1;      
        }
        
        let instance = this;

        let note = this.template(id, content);
        let node = this.render(parentId, note);
        this.onDblClick = this.onDblClick.bind(this); 
        this.onBlur = this.onBlur.bind(this); 

        node.innerHTML = "Другой текст";
        node.onclick = this.onDblClick;

        console.log(node);
        
        
        // node.addEventListener('dblclick', this.onDblClick);      
        // node.addEventListener('blur', this.onBlur);
    }

    id;

    // init(elem) {
    // }

    template = (id, content) => {
        let noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.setAttribute('draggable', 'true');
        noteElement.dataset.noteId = id;
        noteElement.textContent = content;

        return noteElement;
    }

    render = (parentId, noteElement) => {
        let parentColumn = document.querySelector('[data-column-id = "' + parentId + '"]')
        parentColumn.querySelector('[data-notes]').append(noteElement);
        return noteElement;
    }

    edit = (note = this.getNode()) => {
        startEdit(note);
    }

    onDblClick(event) {
        alert(event);
        
        event.target.removeAttribute('draggable');
        event.target.closest('.column').removeAttribute('draggable');
        this.edit();
        return 1;
    }

    onBlur(event) {
        event.target.removeAttribute('contenteditable');
        event.target.setAttribute('draggable', 'true');
        event.target.closest('.column').setAttribute('draggable', 'true');
        if(isTextEmpty(event.target)) {
            event.target.remove();
        }
    }

}

Note.nextId = '8';
