document.addEventListener("DOMContentLoaded", () => {

    const formInput = document.getElementById("inputBook");
    const formSearch = document.getElementById("searchBook");

    formInput.addEventListener("submit", (e) => {
        e.preventDefault();
        addBook();

        document.getElementById("inputBookTitle").value = "";
        document.getElementById("inputBookAuthor").value = "";
        document.getElementById("inputBookYear").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputSearch = document.getElementById("searchBookTitle").value;
        bookSearch(inputSearch);
    })

    if (isStorageAvailable()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondataloaded", () => {
    renderFromBooks();
});
