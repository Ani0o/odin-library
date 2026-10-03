let myLibrary = [];

const container = document.querySelector('.book-container');

const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const openButton = document.querySelector('.dialog-button');
const closeButton = document.querySelector('.cancel-button');

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    info() {
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${(this.read === "true") ? "have read" : "not read yet"}`;
    }

    toggleRead() {
        if (this.read === "true") {
            this.read = "false";
        } else {
            this.read = "true";
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    display();
}

// Manually added books to test display
addBookToLibrary("Bleach", "Kubo", "14000", "true");
addBookToLibrary("Demon Slayer", "Koyoharu Gotouge", "4496", "true");
addBookToLibrary("Tomodachi Game", "Yuki Sato", "5100", "false");
addBookToLibrary("Tokyo Ghoul", "Sui Ishida", "6670", "true");

function display() {
    container.replaceChildren();

    myLibrary.forEach(book => {
        const cardContainerElement = document.createElement('div');
        const cardElement = document.createElement('div');
        const topSectionElement = document.createElement('div');
        const bottomSectionElement = document.createElement('div'); 
        const titleElement = document.createElement('p');
        const authorElement = document.createElement('p');
        const pagesElement = document.createElement('p');
        const readElement = document.createElement('p');
        const readButtonElement = document.createElement('button');
        const deleteButtonElement = document.createElement('button');

        cardContainerElement.classList.add('card-container');
        cardElement.classList.add('card');
        topSectionElement.classList.add('top-section');
        bottomSectionElement.classList.add('bottom-section');
        titleElement.classList.add('title');
        authorElement.classList.add('author');
        pagesElement.classList.add('pages');
        readElement.classList.add('read');
        deleteButtonElement.classList.add('delete-button');
        if (book.read === "true") {
            readButtonElement.classList.add('unread-button');
        } else {
            readButtonElement.classList.add('read-button');
        }

        cardContainerElement.setAttribute('data-id', `${book.id}`);

        titleElement.innerText = book.title;
        authorElement.innerText = book.author;
        pagesElement.innerText = `Pages: ${book.pages}`;
        readElement.innerText = (book.read === "true") ? "Read" : "Not Read";
        readButtonElement.innerText = (book.read === "true") ? "Unread" : "Read";
        deleteButtonElement.innerText = "Delete";

        topSectionElement.appendChild(titleElement);
        topSectionElement.appendChild(authorElement);

        bottomSectionElement.appendChild(pagesElement);
        bottomSectionElement.appendChild(readElement);

        cardElement.appendChild(topSectionElement);
        cardElement.appendChild(bottomSectionElement);

        cardContainerElement.appendChild(cardElement);
        cardContainerElement.appendChild(readButtonElement);
        cardContainerElement.appendChild(deleteButtonElement);

        container.appendChild(cardContainerElement);
    });

    const readButtons = document.querySelectorAll('.read-button, .unread-button');
    const deleteButtons = document.querySelectorAll('.delete-button');

    readButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.parentElement.getAttribute('data-id');

            myLibrary.forEach((book) => {
                if (book.id === id) {
                    book.toggleRead();
                }
            });
            display();
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.parentElement.getAttribute('data-id');

            myLibrary = myLibrary.filter((book) => {
                if (book.id === id) {
                    return false;
                } else {
                    return true;
                }
            });
            display();
        });
    });
}

const title = document.getElementById('form-title');
const author = document.getElementById('form-author');
const pages = document.getElementById('form-pages');

const titleError = document.querySelector('#form-title + span.error');
const authorError = document.querySelector('#form-author + span.error');
const pagesError = document.querySelector('#form-pages + span.error');

openButton.addEventListener('click', (e) => {
    dialog.showModal();
});

closeButton.addEventListener('click', (e) => {
    form.reset();
    dialog.close();
    titleError.textContent = "";
    titleError.className = "error";
    authorError.textContent = "";
    authorError.className = "error";
    pagesError.textContent = "";
    pagesError.className = "error";
});

form.addEventListener('submit', (event) => {
    if (!title.validity.valid) {
        showTitleError();
        event.preventDefault();
        return;
    } else if (!author.validity.valid) {
        showAuthorError();
        event.preventDefault();
        return;
    } else if (!pages.validity.valid) {
        showPagesError();
        event.preventDefault();
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    addBookToLibrary(data.title, data.author, data.pages, data.read);
    form.reset();
});

function showTitleError() {
    if (title.validity.valueMissing) {
        titleError.textContent = "The book name must be filled!";
    } else if (title.validity.typeMismatch) {
        titleError.textContent = "Entered value needs to be text.";
    }
    titleError.className = "error active";
}

function showAuthorError() {
    if (author.validity.valueMissing) {
        authorError.textContent = "The author name must be filled!";
    } else if (author.validity.typeMismatch) {
        authorError.textContent = "Entered value needs to be text.";
    }
    authorError.className = "error active";
}

function showPagesError() {
    if (pages.validity.valueMissing) {
        pagesError.textContent = "The number of pages must be filled!";
    } else if (pages.validity.typeMismatch) {
        pagesError.textContent = "Entered value needs to be a number.";
    } else if (pages.validity.rangeUnderflow) {
        pagesError.textContent = `Number of pages should be at least ${pages.min}; you entered ${pages.value}.`;
    }
    pagesError.className = "error active";
}

title.addEventListener('input', (event) => {
    if (title.validity.valid) {
        titleError.textContent = "";
        titleError.className = "error";
    } else {
        showTitleError();
    }
});

author.addEventListener('input', (event) => {
    if (author.validity.valid) {
        authorError.textContent = "";
        authorError.className = "error";
    } else {
        showAuthorError();
    }
});

pages.addEventListener('input', (event) => {
    if (pages.validity.valid) {
        pagesError.textContent = "";
        pagesError.className = "error";
    } else {
        showPagesError();
    }
});
