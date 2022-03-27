const BOOKS_STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageAvailable() {
    if (typeof Storage === "undefined") {
        alert("Your browser not supported web storage!");
        return false;
    } else {
        return true;
    }
}

function updateDataFromStorage() {
    if (isStorageAvailable()) {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    }
}

function loadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY));

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function composeBookObject(id, title, author, year, isComplete) {
    return {
        id, title, author, year, isComplete,
    };
}

function renderFromBooks() {
    for (book of books) {
        const newBook = createBook(book.id, book.title, book.author, book.year, book.isComplete);

        if (book.isComplete) {
            document.getElementById(COMPLETE_BOOK).append(newBook);
        } else {
            document.getElementById(INCOMPLETE_BOOK).append(newBook);
        }
    }
}

function deleteBookFromStorage(idBook) {
    for (let array = 0; array < books.length; array++) {
        if (books[array].id == idBook) {
            books.splice(array, 1);
            break;
        }
    }
}