document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("bookForm");
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  loadBooks();

  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = Number(document.getElementById("bookFormYear").value);
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    const book = {
      id: Date.now(),
      title,
      author,
      year,
      isComplete,
    };

    saveBook(book);
    renderBook(book);
    bookForm.reset();
  });

  function saveBook(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach((book) => renderBook(book));
  }

  function renderBook(book) {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("data-bookid", book.id);
    bookItem.setAttribute("data-testid", "bookItem");

    const titleElement = document.createElement("h3");
    titleElement.setAttribute("data-testid", "bookItemTitle");
    titleElement.innerText = book.title;

    const authorElement = document.createElement("p");
    authorElement.setAttribute("data-testid", "bookItemAuthor");
    authorElement.innerText = `Penulis: ${book.author}`;

    const yearElement = document.createElement("p");
    yearElement.setAttribute("data-testid", "bookItemYear");
    yearElement.innerText = `Tahun: ${book.year}`;

    const buttonContainer = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeButton.innerText = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    completeButton.addEventListener("click", () => toggleComplete(book.id));

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.innerText = "Hapus Buku";
    deleteButton.addEventListener("click", () => deleteBook(book.id));

    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);

    bookItem.appendChild(titleElement);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(yearElement);
    bookItem.appendChild(buttonContainer);

    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  }

  function toggleComplete(bookId) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    const bookIndex = books.findIndex((book) => book.id == bookId);

    if (bookIndex > -1) {
      books[bookIndex].isComplete = !books[bookIndex].isComplete; // Toggle isComplete
      localStorage.setItem("books", JSON.stringify(books));
      reloadBooks(); // Reload books to update display
    }
  }

  function deleteBook(bookId) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter((book) => book.id != bookId); // Remove the book with the given ID
    localStorage.setItem("books", JSON.stringify(books));
    reloadBooks(); // Reload books to update display
  }

  function reloadBooks() {
    // Clear both lists
    incompleteBookList.innerHTML = "";
    completeBookList.innerHTML = "";

    // Reload books from local storage
    loadBooks();
  }
});
