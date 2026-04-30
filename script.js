const myLibrary = [];

function Book(title, author, genre) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.status = "unread";
}

/* */
function addBookToLibrary(title, author, genre) {
  const myBook = new Book(title, author, genre);
  myLibrary.push(myBook);
}

/* Removes a book from screen checking dataset id of div element */
function removeBook() {
  const parent = this.parentElement;
  for (let book in myLibrary) {
    if (parent.dataset.bookId === myLibrary[book].id) {
      parent.remove();
      myLibrary.splice(book, 1);
    }
  }
}

/*Create function to change read status*/
Book.prototype.changeStatus = function () {
  if (this.status === "unread") {
    this.status = "read";
  } else {
    this.status = "unread";
  }
};

/* Create html elements */
function buildElement() {
  const container = document.querySelector(".container-items");

  const newCard = document.createElement("div");
  newCard.dataset.bookId = myLibrary[myLibrary.length - 1].id;
  newCard.classList.add("item");
  container.appendChild(newCard);

  const title = document.createElement("h3");
  title.textContent = myLibrary[myLibrary.length - 1].title;
  newCard.appendChild(title);

  const author = document.createElement("p");
  author.textContent = myLibrary[myLibrary.length - 1].author;
  newCard.appendChild(author);

  const genre = document.createElement("p");
  genre.textContent = myLibrary[myLibrary.length - 1].genre;
  newCard.appendChild(genre);

  const statusDisplay = document.createElement("div");
  statusDisplay.textContent = myLibrary[myLibrary.length - 1].status;
  newCard.appendChild(statusDisplay);

  const statusBtn = document.createElement("button");
  statusBtn.textContent = "Status";
  statusBtn.classList.add("status-btn");
  statusBtn.addEventListener("click", function () {
    const parent = this.parentElement;
    for (let book in myLibrary) {
      if (parent.dataset.bookId === myLibrary[book].id) {
        myLibrary[book].changeStatus();
        statusDisplay.textContent = myLibrary[book].status;
      }
    }
  });
  newCard.appendChild(statusBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", removeBook);
  newCard.appendChild(removeBtn);
}

const form = document.getElementById("bookForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;

  addBookToLibrary(title, author, genre);
  buildElement();

  console.log(myLibrary);
  form.reset();
});

