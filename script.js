const myLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Manually added books to test display
addBookToLibrary("Bleach", "Kubo", "95", "true");
addBookToLibrary("Demon Slayer", "Koyoharu Gotouge", "55", "true");
addBookToLibrary("Tomodachi Game", "Yuki Sato", "45", "false");
addBookToLibrary("Tokyo Ghoul", "Sui Ishida", "88", "true");

function display() {
    const container = document.querySelector(".book-container");

    myLibrary.forEach(book => {
        const cardElement = document.createElement("div");
        const topSectionElement = document.createElement("div");
        const bottomSectionElement = document.createElement("div"); 
        const titleElement = document.createElement("p");
        const authorElement = document.createElement("p");
        const pagesElement = document.createElement("p");
        const readElement = document.createElement("p");

        cardElement.classList.add("card");
        topSectionElement.classList.add("top-section");
        bottomSectionElement.classList.add("bottom-section");
        titleElement.classList.add("title");
        authorElement.classList.add("author");
        pagesElement.classList.add("pages");
        readElement.classList.add("read");

        titleElement.innerText = book.title;
        authorElement.innerText = book.author;
        pagesElement.innerText = `Pages: ${book.pages}`;
        readElement.innerText = (book.read === "true") ? "Read" : "Not Read";

        topSectionElement.appendChild(titleElement);
        topSectionElement.appendChild(authorElement);

        bottomSectionElement.appendChild(pagesElement);
        bottomSectionElement.appendChild(readElement);

        cardElement.appendChild(topSectionElement);
        cardElement.appendChild(bottomSectionElement);

        container.appendChild(cardElement);
    });
}

display();