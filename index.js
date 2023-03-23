class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("bookCollection")) || [];
    this.bookList = document.getElementById("book-list");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.addButton = document.getElementById("add-btn");

    this.addButton.addEventListener("click", () => this.addBook());
    this.displayBooks();
  }

  addBook() {
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    const book = new Book(title, author);
    this.books.push(book);
    this.updateLocalStorage();
    this.displayBooks();
    this.clearInputs();
  }

  removeBook(title, author) {
    this.books = this.books.filter(
      (book) => book.title !== title || book.author !== author
    );
    this.updateLocalStorage();
    this.displayBooks();
  }

  updateLocalStorage() {
    localStorage.setItem("bookCollection", JSON.stringify(this.books));
  }

  displayBooks() {
    this.bookList.innerHTML = "";
    this.books.forEach((book) => {
      const li = document.createElement("li");
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () =>
        this.removeBook(book.title, book.author)
      );
      li.textContent = `${book.title} by ${book.author}`;
      li.appendChild(removeButton);
      this.bookList.appendChild(li);
    });
  }

  clearInputs() {
    this.titleInput.value = "";
    this.authorInput.value = "";
  }
}

const bookCollection = new BookCollection();
