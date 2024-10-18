const tasksList = document.querySelector("#tasks-list");
const addTask = document.querySelector("#add-task");
const name1 = document.querySelector("#name");
const author = document.querySelector("#author");
const year = document.querySelector("#year");
const genre = document.querySelector("#genre");
const status1 = document.querySelector("#status");
const clean = document.querySelector("#clean");

document.addEventListener("DOMContentLoaded", loadBooks);

let books = [];
let editingIndex = null;
let currentFilter = 'all';

function loadBooks() {
    books = JSON.parse(localStorage.getItem("books")) || [];
    renderTasks();
}

addTask.addEventListener("click", addTaskFunc);

function addTaskFunc() {
    const obj = {
        nameBook: name1.value,
        authorBook: author.value,
        yearBook: year.value,
        genreBook: genre.value,
        statusBook: status1.value,
    };

    if (editingIndex !== null) {
        books[editingIndex] = obj;
        editingIndex = null;
    } else {
        books.push(obj);
    }

    saveBooks();
    renderTasks();
    clearInputs();
}

function renderTasks() {
    tasksList.innerHTML = "";

    const filteredBooks = books.filter(book => {
        if (currentFilter === 'read') return book.statusBook === 'Прочитано';
        if (currentFilter === 'unread') return book.statusBook === 'Не прочитано';
        return true;
    });

    filteredBooks.forEach((book, index) => {
        const bookContainer = document.createElement("div");
        bookContainer.className = "book-container";

        const bookName = document.createElement("div");
        bookName.textContent = book.nameBook;
        bookName.className = "book";

        const bookAuthor = document.createElement("div");
        bookAuthor.textContent = book.authorBook;
        bookAuthor.className = "book";

        const bookYear = document.createElement("div");
        bookYear.textContent = book.yearBook;
        bookYear.className = "book";

        const bookGenre = document.createElement("div");
        bookGenre.textContent = book.genreBook;
        bookGenre.className = "book";

        const bookStatus = document.createElement("div");
        bookStatus.textContent = book.statusBook;
        bookStatus.className = "book";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Редактировать";
        editBtn.addEventListener("click", () => editTaskFunc(index));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.addEventListener("click", () => deleteBtnFunc(index));

        bookContainer.appendChild(bookName);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookYear);
        bookContainer.appendChild(bookGenre);
        bookContainer.appendChild(bookStatus);
        bookContainer.appendChild(editBtn);
        bookContainer.appendChild(deleteBtn);

        tasksList.appendChild(bookContainer);
    });
}

function deleteBtnFunc(index) {
    books.splice(index, 1);
    saveBooks();
    renderTasks();
}

function editTaskFunc(index) {
    const book = books[index];
    name1.value = book.nameBook;
    author.value = book.authorBook;
    year.value = book.yearBook;
    genre.value = book.genreBook;
    status1.value = book.statusBook;
    editingIndex = index;
}

function clearInputs() {
    name1.value = "";
    author.value = "";
    year.value = "";
    genre.value = "";
    status1.value = "Не прочитано";
}

function filterBooks(filter) {
    currentFilter = filter;
    renderTasks();
}

document.getElementById('filter-all').addEventListener('click', () => filterBooks('all'));
document.getElementById('filter-read').addEventListener('click', () => filterBooks('read'));
document.getElementById('filter-unread').addEventListener('click', () => filterBooks('unread'));

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

if (clean) {
    clean.addEventListener("click", clearInputs);
}


function removeBook(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    const index = books.findIndex(b => b.nameBook === book.nameBook && b.authorBook === book.authorBook);
    if (index > -1) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
    }
}

