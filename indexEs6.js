console.log("Tut 33 by Es6")

class books{
    constructor(bookName, authorName, type) {
        this.name = bookName;
        this.author = authorName;
        this.type = type;
    }
}

class Display{
    add (book) {
        console.log("Adding to UI")
        let tbody = document.getElementById("tbody");
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`
        tbody.innerHTML += uiString;
    }

    clear () {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset(); // This method reset the form.
    }

    validate (book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show (type, message) {
        let msg = document.getElementById('message');
        let boldtext;
        if (type === 'success'){
            boldtext = 'Success!';
        }
        else{
            boldtext = 'Error!'
        }
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show success" role="alert">
                            <strong>${boldtext}</strong> ${message}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`
        setTimeout(function(){
            msg.innerHTML = "";
        }, 2000);
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener("submit", libraryFormSubmit);


function libraryFormSubmit(e) {
    console.log("You have submitted form")
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;

    // fiction, programming, cooking
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let other = document.getElementById("others");

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else if (other.checked) {
        type = other.value;
    }

    let book = new books(name, author, type);
    console.log(book)
    e.preventDefault();  // it will stop the default the event of form 

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Your book has been added successfully");
    }
    else {
        // Show error
        display.show("danger", "You can not added this book")
    }
}


