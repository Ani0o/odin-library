let myLibrary = [];

const container = document.querySelector('.book-container');

const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const openButton = document.querySelector('.dialog-button');
const closeButton = document.querySelector('.cancel-button');

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `The ${title} by ${author}, ${pages} pages, ${(this.read === "true") ? "have read" : "not read yet"}`;
    }
}

Book.prototype.toggleRead = function () {
    if (this.read === "true") {
        this.read = "false";
    } else {
        this.read = "true";
    }
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    display();
}

// Manually added books to test display
addBookToLibrary("Bleach", "Kubo", "95", "true");
addBookToLibrary("Demon Slayer", "Koyoharu Gotouge", "55", "true");
addBookToLibrary("Tomodachi Game", "Yuki Sato", "45", "false");
addBookToLibrary("Tokyo Ghoul", "Sui Ishida", "88", "true");

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

openButton.addEventListener('click', (e) => {
    dialog.showModal();
});

closeButton.addEventListener('click', (e) => {
    dialog.close();
    form.reset();
});

dialog.addEventListener('close', (e) => {
    if (dialog.returnValue === 'submit') {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        addBookToLibrary(data.title, data.author, data.pages, data.read);
        form.reset();
    }
    dialog.returnValue = '';
});