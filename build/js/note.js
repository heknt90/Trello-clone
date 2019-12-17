const Note = {
    // Идентификатор для будующей записи
    idCounter:  8,
    // Свойство, хранящее элемент-запись, которая в данный момент перетаскивается
    dragged: null,

    // Создание новой записи
    create(currentColumn) {
        let noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.dataset.noteId = Note.idCounter++;

        currentColumn.querySelector('[data-notes]').append(noteElement);
        Note.init(noteElement);

        // Сразу же инициируем редактирование новой записи
        noteElement.setAttribute('contenteditable', 'true');
        noteElement.focus();
    },

    // Инициализация записи
    init(noteElement) {
        noteElement.addEventListener('dblclick', Note.onDblClick);
        noteElement.addEventListener('blur', Note.onBlur);

        // Подключаем drag'n'drop обработчики записей
        // Записи можно перетаскивать внутри одной и той же колонки и между другими существующими колонками
        noteElement.addEventListener('dragstart', Note.dragstart);
        noteElement.addEventListener('dragend', Note.dragend);
        noteElement.addEventListener('dragenter', Note.dragenter);
        noteElement.addEventListener('dragover', Note.dragover);
        noteElement.addEventListener('dragleave', Note.dragleave);
        noteElement.addEventListener('drop', Note.drop);
    },
    
    onDblClick(event) {
        event.target.setAttribute('contenteditable', 'true');
        event.target.removeAttribute('draggable');
        event.target.closest('.column').removeAttribute('draggable');
        event.target.focus();
    },

    onBlur(event) {
        event.target.removeAttribute('contenteditable');
        event.target.setAttribute('draggable', 'true');
        event.target.closest('.column').setAttribute('draggable', 'true');
        if(!event.target.textContent.trim().length) {
            event.target.remove();
        }
    },

    dragstart() {
        // Запамянаем перетаскиваемый элемент
        Note.dragged = this;
        // Добавляем ему класс .dragged, за счет чего он (оригинал) становится 
        // прозрачным, а событие draggable отображает его дубликат на месте курсора
        this.classList.add('dragged');
        
        // event.stopPropagation();
    },

    dragend() {
        // При отмене перетаскивания "забываем" перетаскиваемый элемент
        Note.dragged = null;
        // И удаляем у него класс, прятавший его оригинал
        this.classList.remove('dragged');
    
        // Точно не знаю для чего это, возможно где-то не удаляется фокусировка 
        // на целях после наведения на них
        // document
        //     .querySelectorAll('.note')
        //     .forEach(x => x.classList.remove('under'));
    },

    dragenter() {
        // При попадании на запись
        // Мне кажется, что здесь нужно еще проверить, что перетаскивается 
        // именно запись, а не колонка
        if (this === Note.dragged || !Note.dragged) return;
        this.classList.add('under');
    },

    // Обработчик события наведения на запись
    // Происходит когда над данной колонкой находится перетаскиваемая запись
    // или другая колонка
    // Здесь по идее ничего не должно происходить. Перетаскиваемый элемент уже
    // попал сюда, но с ним еще ничего не должно произойти
    dragover() {
        event.preventDefault();
        if (this === Note.dragged || !Note.dragged) return;
    },

    // Обработчик события удаления drag от записи
    // Происходит в момент когда перетаскиваемая запись или другая колонка находилась над текушей
    // и происходит утаскивание первой без вызова события drop на текушей
    // Покидаем запись, значит у цели должен удалиться класс under
    dragleave() {
        if (this === Note.dragged || !Note.dragged) return;
        this.classList.remove('under');
    },

    // Обработчик события drop на запись
    // Происходит либо когда данную колонку бросают на другую колонку
    // Может происходить смена колонки, либо изменение очередности записей
    drop() {
        event.stopPropagation();
        if (this === Note.dragged || !Note.dragged) return;
    
        if (this.parentElement === Note.dragged.parentElement) {
            let note = Array.from(this.parentElement.querySelectorAll('.note'));
            let indexA = note.indexOf(Note.dragged);
            let indexB = note.indexOf(this);
            
            if (indexA > indexB) {
                this.parentElement.insertBefore(Note.dragged, this);
            } 
            else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
            }
        } 
        else {
            this.parentElement.insertBefore(Note.dragged, this);
        }
    },
}

