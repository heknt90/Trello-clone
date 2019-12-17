const Column = {
    // Следующий ID для будующей колонки 
    idCounter: 3,
    // Свойство, в котором хранится информация, о перетаскиваемом в данным момент элементе (колонке)
    dragged: null,
    
    // Метод создания новой колонки
    create() {
        // При клике на элементе добавления новой колонки, создаем новую колонку
        let columnElement = document.createElement('div');
        columnElement.classList.add('column');
        // Добавляем разрешение, что ее тоже можно будет перетаскивать
        columnElement.setAttribute('draggable', 'true');
        columnElement.dataset.columnId = Column.idCounter++;

        // Шаблон содержимого колонки
        columnElement.innerHTML = `<p class="column-header" contenteditable="true">В плане</p>
                                    <div data-notes></div>
                                    <p class="column-footer">
                                        <span data-action-addNote class="action">+ Добавить карточку</span>
                                    </p>`;

        // Вставляем новую колонку в документ
        document.querySelector('.columns').append(columnElement);

        // Добавляем обработчики к новой колонке и ее элементам управления
        Column.init(columnElement);
    },

    // Инициализация колонки
    init(columnElement) {
        // Вешаем обработчики редактирования заголовка колонки
        const columnHeader = columnElement.querySelector('.column-header');

        columnHeader.addEventListener('dblclick', Column.onHeaderDblClick);
        columnHeader.addEventListener('blur', Column.onHeaderBlur);

        // Элемент управляющий созданием новых записей внутри колонки (вешаем обработчик)
        const noteCreatorElement = columnElement.querySelector('[data-action-addNote]');
        noteCreatorElement.addEventListener('click', () => {
            Note.create(columnElement);
        });

        // Вешаем события на инициируемую колонку
        columnElement.addEventListener('dragstart', Column.dragstart);
        columnElement.addEventListener('dragend', Column.dragend);
        columnElement.addEventListener('dragenter', Column.dragenter);
        columnElement.addEventListener('dragover', Column.dragover);
        columnElement.addEventListener('dragleave', Column.dragleave);
        columnElement.addEventListener('drop', Column.drop);
    },
    
    onHeaderDblClick(event) {
        event.target.setAttribute('contenteditable', 'true');
        event.target.focus();
    },

    onHeaderBlur(event) {
        event.target.removeAttribute('conteneditable');        
    },

    dragstart() {

    },

    dragend() {

    },

    dragenter() {

    },

    // Обработчик события наведения на колонку
    // Происходит когда над данной колонкой находится перетаскиваемая запись
    // или другая колонка
    dragover() {
        if (this === Column.dragged || !Column.dragged) { // Перепроверить условия!
            return;
        };
        event.preventDefault();
    },

    // Обработчик события удаления drag от колонки
    // Происходит в момент когда перетаскиваемая запись или другая колонка находилась над текушей
    // и происходит утаскивание первой без вызова события drop на текушей
    dragleave() {
        if ( this.closest('.column') === Column.dragged || Column.dragged ) { // Перепроверить условия!
            return;
        };
        this.classList.remove('under');
    },

    // Обработчик события drop на колонке
    // Происходит либо когда данную колонку бросают
    drop() {
        if (this === Column.dragged || !Column.dragged) { // Перепроверить условия!
            return;
        };
        if (Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged);
        }
    }
    
// // >>>>>>>>>>>>>>>>>

// // Это недописанный код обработчиков перетаскивания колонок

//     // dragstart(event) {
//     //     if(!Column.dragged) return;
//     //     Column.dragged = this;
//     //     this.classList.add('dragged');
//     //     console.log(Column.dragged);
//     // },

//     // dragend(event) {
//     //     Column.dragged = null;
//     //     this.classList.remove('dragged');
//     // },

//     // dragenter (event) {
//     //     if (this === Column.dragged) return;
//     //     this.classList.add('under');
//     // },

// // <<<<<<<<<<<<<<<<<

//     // Честно говоря, мне не очень нравится такой подход к обработчикам. 
//     // Так например обработчик draggable колонки обработавыет события перетаскивания записи и перетаскивания другой колонки
//     // Мне кажется, что лучше было бы использовать делегирование
    
//     
}


// Элемент добавления новой колонки
document
    .querySelector('[data-action-addColumn]')
    // Вешаем обработчик создания новой колонки
    .addEventListener('click', () => {
        Column.create();
    });