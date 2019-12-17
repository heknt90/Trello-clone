'use strict';

function createCaretPlacer(atStart) { 
    return function(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            let range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(atStart);
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
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

