const INCOMPLETE_BOOK = "incompleteBookshelfList";
const COMPLETE_BOOK = "completeBookshelfList";

function addBook() {
    const idBook = +new Date();
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = createBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    const bookObject = composeBookObject(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

    books.push(bookObject);

    if (inputBookIsComplete) {
        document.getElementById(COMPLETE_BOOK).append(book);
    } else {
        document.getElementById(INCOMPLETE_BOOK).append(book);
    }

    updateDataFromStorage();
}

function createBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
    const book = document.createElement("article");
    book.setAttribute("id", idBook)
    book.classList.add("card", "my-3", "rounded-xl", "card-book", "shadow-bar");

    const bookTitle = document.createElement("h5");
    bookTitle.classList.add("text-truncate", "bookTitle");
    bookTitle.style.maxWidth = "202px";
    bookTitle.innerText = inputBookTitle;

    const bookAuthor = document.createElement("span");
    bookAuthor.classList.add("text-truncate", "d-inline-block", "bookAuthor");
    bookAuthor.style.maxWidth = "202px";
    bookAuthor.innerText = inputBookAuthor;

    const bookYear = document.createElement("span");
    bookYear.classList.add("bookYear");
    bookYear.innerText = inputBookYear;

    const br = document.createElement("br");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body", "d-flex", "justify-content-between");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardAction = addAction(inputBookIsComplete, idBook);

    cardContent.append(bookTitle, bookAuthor, br, bookYear);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    book.append(cardContainer);

    return book;
}

function addAction(inputBookIsComplete, idBook) {
    const cardActions = document.createElement("div");

    const actionDelete = createActionDelete(idBook);
    const actionRead = createActionRead(idBook);
    const actionUndo = createActionUndo(idBook);

    cardActions.append(actionDelete);

    if (inputBookIsComplete) {
        cardActions.append(actionUndo);
    } else {
        cardActions.append(actionRead);
    }

    return cardActions;
}

function createActionDelete(idBook) {
    const actionDelete = document.createElement("button");
    actionDelete.classList.add("btn", "btn-sm", "btn-outline-danger", "mx-1");
    actionDelete.innerHTML = '<i class="bi bi-x"></i>';

    actionDelete.addEventListener("click", function () {
        let confirmation = confirm("Are you sure to delete this book?");

        if (confirmation) {
            const cardParent = document.getElementById(idBook);
            cardParent.addEventListener("eventToDelete", function (event) {
                event.target.remove();
            });
            cardParent.dispatchEvent(new Event("eventToDelete"));

            deleteBookFromStorage(idBook);
            updateDataFromStorage();
        }
    });

    return actionDelete;
}

function createActionRead(idBook) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm", "btn-outline-primary");
    action.innerHTML = '<i class="bi bi-check"></i>';

    action.addEventListener("click", function () {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".card-content > h5").innerText;
        const bookAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

        cardParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(COMPLETE_BOOK).append(book);

        deleteBookFromStorage(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, true);

        books.push(bookObject);
        updateDataFromStorage();
    })

    return action;
}

function createActionUndo(idBook) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm", "btn-outline-secondary");
    action.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i>';

    action.addEventListener("click", function () {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".card-content > h5").innerText;
        const bookAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

        cardParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(INCOMPLETE_BOOK).append(book);

        deleteBookFromStorage(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, false);

        books.push(bookObject);
        updateDataFromStorage();
    })

    return action;
}

function bookSearch(keyword) {
    const filter = keyword.toUpperCase();
    const titles = document.getElementsByTagName("h5");

    for (let i = 0; i < titles.length; i++) {
        const titlesText = titles[i].textContent || titles[i].innerText;

        if (titlesText.toUpperCase().indexOf(filter) > -1) {
            titles[i].closest(".card").style.display = "";
        } else {
            titles[i].closest(".card").style.display = "none";
        }
    }
}