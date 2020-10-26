console.log("Tut 33 by Es6")

let bookObj = {};
let getBook = '';
let allBooks = {};
let allBooksCount = localStorage.length;

const showAllStoredBooks = () => {
    console.log(localStorage.length);
    for (var i = 0; i < allBooksCount; i++) {
        item = localStorage.key(i)
        if (item.includes('book')) {
            getItem = localStorage.getItem(`${item}`)
            let getBook = JSON.parse(getItem)
            console.log(getBook);
            let tbody = document.getElementById("tbody");
            let uiString = `<tr>
                                <td>${i + 1}</td>
                                <td>${getBook.name}</td>
                                <td>${getBook.author}</td>
                                <td>${getBook.type}</td>
                                <td><button type="button" id=${getBook.id} onclick="deleteBook(this.id)" class="btn btn-outline-danger">Remove</button></td>
                            </tr>`
            tbody.innerHTML += uiString;
        }
    }
    allBooks = getBook
    return allBooks;
}

function deleteBook(index) {
    localStorage.removeItem(`book_${index}`)
    show("success", "Your book has been deleted successfully");
}

//Function for adding book in the localstorage
function addBook(bookName, authorName, type) {
    bookObj = {
        id: `${allBooksCount + 1}`,
        name: bookName,
        author: authorName,
        type: type
    };
    console.log(bookObj);
    localStorage.setItem(`book_${allBooksCount + 1}`, JSON.stringify(bookObj));
    bookObj = {};
}

// Function for showing message of success added and failed error
const show = (type, message) => {
    let msg = document.getElementById('message');
    let boldtext;
    if (type === 'success') {
        boldtext = 'Success!';
    }
    else {
        boldtext = 'Error!'
    }
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show success" role="alert">
                                            <strong>${boldtext}</strong> ${message}
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>`
    setTimeout(function () {
        msg.innerHTML = "";
        location.reload()
    }, 2000);
}



// Function for validate book name and author are right.
const validate = (book) => {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}


//Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener("submit", libraryFormSubmit);

//Show stored books
let allStoredBooks = showAllStoredBooks()
console.log(allStoredBooks);

//Main code 
function libraryFormSubmit(e) {
    e.preventDefault()
    console.log("You have submitted form")
    let bookName = document.getElementById("bookName").value;
    let bookAuthor = document.getElementById("author").value;
    let bookType;

    // fiction, programming, cooking
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let other = document.getElementById("others");

    if (fiction.checked) {
        bookType = fiction.value;
    }
    else if (programming.checked) {
        bookType = programming.value;
    }
    else if (cooking.checked) {
        bookType = cooking.value;
    }
    else if (other.checked) {
        bookType = other.value;
    }


    if (bookName.length > 2 && bookAuthor.length > 2) {
        addBook(bookName, bookAuthor, bookType);
        show("success", "Your book has been added successfully");
    }
    else {
        // Show error
        show("danger", "You can not added this book")
    }
}


