'use strict';

document
.querySelectorAll('.column')
.forEach(Column.process);

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', event => {

        let columnElement = document.createElement('div');
        columnElement.classList.add('column');
        columnElement.setAttribute('draggable', 'true');
        columnElement.dataset.columnId = Column.idCounter++;

        columnElement.innerHTML = `<p class="column-header" contenteditable="true">В плане</p>
                                    <div data-notes></div>
                                    <p class="column-footer">
                                        <span data-action-addNote class="action">+ Добавить карточку</span>
                                    </p>`;

        document.querySelector('.columns').append(columnElement);
        Column.process(columnElement);
    });

document
    .querySelectorAll('.note')
    .forEach(Note.process);



