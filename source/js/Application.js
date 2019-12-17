'use strict';

const TrelloApplication = {
    key : 'my-trello-app1',
    state: {},
    root : document.getElementById('root'),
    
    test() {
        new Note();
    },

    clearRoot() {
        document.querySelector('.columns').innerHTML = '';
    },

    parseDOM() {
        let object = {
            columns: [],
            notes: []
        };
        const columns = document.querySelectorAll('[data-column-id]');
        const notes  = document.querySelectorAll('[data-note-id]');
        
        columns.forEach(column => {
            let notes = [];
            column.querySelectorAll('[data-note-id]').forEach(note => {
                notes.push(parseInt(note.dataset.noteId))
            });
            object.columns.push({
                id: column.dataset.columnId,
                title: column.querySelector('.column-header').textContent,
                notes
            });
            })

        notes.forEach(note => {
            object.notes.push({
                id: note.dataset.noteId,
                content: note.textContent
            });
        });

        console.log(object);
        
        return object;
    },

    saveToStorage(object) {

        localStorage.setItem('my-trello-app', JSON.stringify(object));
        
    },

    load() {
        if (localStorage.getItem(this.key)) {
            this.state = JSON.parse(localStorage.getItem(this.key));
        } 
        else {  
            this.state = defaultState;  
        }        

        // Создаем массив из 
        this.state.columns.forEach(column => {
            // Создаем новую колонку с нужным заголовков и id
            new Column(column.id, column.title);
            
            // Проходим по идентификаторам записей прикрепленных к колонке
            column.notes.forEach(noteID => {
                // Выбираем запись, id которого совпадает с идентификатором из списка column.notes
                let note = this.state.notes.find(note => note.id === noteID);
                // Создаем запись в документе
                new Note(note.id, note.content, column.id);
            });
        });

    }
}

// class TrelloApplication {
//     constructor() {
//         // if (localStorage.getItem(this.key)) {
//             // }
//         this.load();

//         console.log(this);

//         // this.root.addEventListener('dblclick', this.onDblClick.bind(this));
//         // this.root.addEventListener('blur', this.onBlur.bind(this));
        
        

//         // this.saveToStorage(this.parseDOM);
//     }

//     key = 'my-trello-app1';
//     state;
//     root = document.getElementById('root');

//     parseDOM() {
//         let object = {
//             columns: [],
//             notes: []
//         };
//         const columns = document.querySelectorAll('[data-column-id]');
//         const notes  = document.querySelectorAll('[data-note-id]');
        
//         columns.forEach(column => {
//             let notes = [];
//             column.querySelectorAll('[data-note-id]').forEach(note => {
//                 notes.push(parseInt(note.dataset.noteId))
//             });
//             object.columns.push({
//                 id: column.dataset.columnId,
//                 title: column.querySelector('.column-header').textContent,
//                 notes
//             });
//             })

//         notes.forEach(note => {
//             object.notes.push({
//                 id: note.dataset.noteId,
//                 content: note.textContent
//             });
//         });

//         console.log(object);
        
//         return object;
//     }

//     saveToStorage(object) {

//         localStorage.setItem('my-trello-app', JSON.stringify(object));
        
//     }

//     load() {
//         if (localStorage.getItem(this.key)) {
//             this.state = JSON.parse(localStorage.getItem(this.key));
//         } 
//         else {  
//             this.state = defaultState;  
//         }        

//         this.state.columns.forEach(column => {
//             console.dir(new Column(column.id, column.title));
//             // new Column(column.id, column.title);

//             for (let noteId in column.notes) {   
                             
//                 let note = this.state.notes.find(note => note.id === column.notes[noteId]);
//                 new Note(note.id, note.content, column.id);
//             }
           
//         });

//     }

//     // onDblClick(event) {
//     //     if (event.target.classList.contains('note')) {
//     //         Note.onDblClick(event);
//     //     }
//     // }
    
//     // onBlur(event) {
//     //     if (event.target.classList.contains('note')) {
//     //         Note.onBlur(event);
//     //     }
        
// }

