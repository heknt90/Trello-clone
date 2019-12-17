'use strict';

class Column {
    constructor(id = Column.nextId++, title = 'Заголовок') {
        this.id = id;
        
        let column = this.template(id, title);
        this.render(column);
                
        this.onDblClick = this.onDblClick.bind(this);
        // this.onBlur = this.onBlur.bind(this);
        
        let node = this.getNode();
        this.init(node);
        
        return this;
    }

    id;

    init(elem) {
        // elem.addEventListener('dblclick', this.onDblClick.bind(this));

    }

    render(columnElement) {
        return document.querySelector('.columns').innerHTML += columnElement;
    }

    template(id, title) {

        let columnElement = `<div class="column" draggable="true" data-column-id="${id}">
                                <p class="column-header">${title}</p>
                                <div data-notes>
                                    
                                </div>
                                <p class="column-footer">
                                    <span data-action-addNote class="action">+ Добавить карточку</span>
                                </p>
                            </div>`

        return columnElement;
    }
    
    getNode = (id = this.id) => {
        return document.querySelector('[data-column-id="' + id + '"]');
    }     
    
    onDblClick(event) {
        alert(event);
        
    }
}

Column.nextId = '8';