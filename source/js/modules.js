'use strict';

function createCaretPlacer(atStart) {  // Функция высшего порядка
    // В placeCaretAtStart/End в нее передается 1 аргумент bool, означающий, схлопываются ли начало и конец диапохона
    // Затем при использовании мы передаем туда аргумент el, который содержит node элемент, в который предстоит установить диапозон
    return function(el) {
        el.focus();
        // Я так понимаю есть 2 метода, которые работают в разных версиях браузеров
        if (!(typeof window.getSelection)
                && !(typeof document.createRange) ) { // Реализация для современных браузеров
            let range = document.createRange(); // Возвращает новый объект типа Range.
            range.selectNodeContents(el); // Выбирает Range содержащий контент Node.
            range.collapse(atStart); // Возвращает Boolean указывающий, находятся ли range's start and на одной и той же позиции.
            let sel = window.getSelection(); //Метод возвращает объект Selection, представленный в виде диапазона текста, который пользователь выделил на странице.
            sel.removeAllRanges(); // Removes all ranges from the selection.
            sel.addRange(range); // A Range object that will be added to the selection.
        } else if ( !(typeof document.body.createTextRange) ) { // Реализация для IE8-
            let textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(atStart);
            textRange.select();
        }
    };
}

let placeCaretAtStart = createCaretPlacer(true);
let placeCaretAtEnd = createCaretPlacer(false);

//     placeCaretAtEnd(e.currentTarget);


let startEdit = (elem) => {
    elem.setAttribute('contenteditable', 'true');
    placeCaretAtEnd(elem);
}

let isTextEmpty = (elem) => {
    return !elem.textContent.trim().length;
}

