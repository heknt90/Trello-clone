'use strict';

// По сути в логике приложения работают 2 сущности: Колонка и Запись.
// И то и другое можно переставлять местами, переименовывать (редактировать)
// Кроме того, записи можно перемещать из одной колонки в другую
// Далее, нужно будет сделать перемещение курсора в конец текста при начале редактирования
// Использовать автоматически редактирование при создании новой колонки (редактировать название колонки)
// и при создании новой записи (редактировать текст записи)

// Позже должен добавиться какой-то новый функционал 
// - (иконка корзины, добавляющая возможность удаления элементов: колонок и (или) записей)

// // Композиция действий с колонками
// document
//     .querySelectorAll('.column')
//     .forEach(Column.init);

// // Элемент добавления новой колонки
// document
//     .querySelector('[data-action-addColumn]')
//     .addEventListener('click', event => {

//         Column.create();
//     });
// // Композиция обработчиков записи
// document
//     .querySelectorAll('.note')
//     .forEach(Note.init);



// const app = new TrelloApplication();
// new TrelloApplication();
// app.save();

// localStorage.removeItem('my-trello-app');

TrelloApplication.test();
// TrelloApplication.clearRoot();
// TrelloApplication.load();

// new Note(666, 'Просто текст 0', 3);

// new Note(666, 'Просто текст', 1);


// new Note(777, 'Просто текст 1', 3);

// console.log(note1);