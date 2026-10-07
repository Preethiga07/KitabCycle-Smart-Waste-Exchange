// ================= STUDENT LOGIN =================

function studentLogin() {

    let name = document.getElementById("studentName").value.trim();
    let email = document.getElementById("studentEmail").value.trim();
    let password = document.getElementById("studentPassword").value.trim();

    let message = document.getElementById("loginMessage");

    if (name === "" || email === "" || password === "") {

        message.innerText = "Please fill all the details.";
        return;
    }

    if (password.length < 4) {

        message.innerText = "Password must contain at least 4 characters.";
        return;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("mainWebsite").style.display = "block";
}


// ================= SEARCH & FILTER =================

function filterBooks() {

    let search =
        document.getElementById("searchInput").value.toLowerCase();

    let category =
        document.getElementById("categoryFilter").value;

    let department =
        document.getElementById("departmentFilter").value;

    let year =
        document.getElementById("yearFilter").value;

    let type =
        document.getElementById("typeFilter").value;

    let books =
        document.getElementsByClassName("book-card");

    for (let i = 0; i < books.length; i++) {

        let bookText =
            books[i].innerText.toLowerCase();

        let bookSubject =
            books[i].dataset.subject;

        let bookDepartment =
            books[i].dataset.department;

        let bookYear =
            books[i].dataset.year;

        let bookType =
            books[i].dataset.type;

        let matchesSearch =
            bookText.includes(search);

        let matchesCategory =
            category === "" ||
            bookSubject === category;

        let matchesDepartment =
            department === "" ||
            bookDepartment === department;

        let matchesYear =
            year === "" ||
            bookYear === year;

        let matchesType =
            type === "" ||
            bookType === type;

        if (
            matchesSearch &&
            matchesCategory &&
            matchesDepartment &&
            matchesYear &&
            matchesType
        ) {

            books[i].style.display = "block";

        } else {

            books[i].style.display = "none";
        }
    }
}


// ================= CONTACT SELLER =================

function contactSeller(bookName) {

    let phoneNumber = "919876543210";

    let message =
        "Hi! I am interested in your book: " +
        bookName +
        " listed on KitabCycle.";

    let whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}


// ================= ADD BOOK =================

document
    .getElementById("bookForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let bookName =
            document.getElementById("bookName").value;

        let subject =
            document.getElementById("subject").value;

        let department =
            document.getElementById("department").value;

        let year =
            document.getElementById("year").value;

        let condition =
            document.getElementById("condition").value;

        let listingType =
            document.getElementById("listingType").value;

        let price =
            document.getElementById("price").value;

        let exchangeBook =
            document.getElementById("exchangeBook").value;

        let photoInput =
            document.getElementById("bookPhoto");

        let photoFile =
            photoInput.files[0];


        let container =
            document.getElementById("bookContainer");


        let newBook =
            document.createElement("div");

        newBook.className = "book-card";

        newBook.dataset.subject = subject;
        newBook.dataset.department = department;
        newBook.dataset.year = year;
        newBook.dataset.type = listingType;


        // Listing type

        let typeHTML = "";

        let extraHTML = "";


        if (listingType === "Sell") {

            typeHTML = `
                <div class="listing-type">
                    💰 SELL
                </div>
            `;

            extraHTML = `
                <div class="price">
                    ₹${price || 0}
                </div>
            `;
        }


        else if (listingType === "Exchange") {

            typeHTML = `
                <div class="listing-type exchange">
                    🔄 EXCHANGE
                </div>
            `;

            extraHTML = `
                <p>
                    <b>Wants in exchange:</b>
                    ${exchangeBook || "Any suitable book"}
                </p>
            `;
        }


        else if (listingType === "Give Away") {

            typeHTML = `
                <div class="listing-type giveaway">
                    🎁 GIVE AWAY
                </div>
            `;

            extraHTML = `
                <div class="price">
                    FREE
                </div>
            `;
        }


        // Book photo

        let photoHTML = "";

        if (photoFile) {

            let imageURL =
                URL.createObjectURL(photoFile);

            photoHTML = `
                <img
                    src="${imageURL}"
                    class="book-photo"
                    alt="Book Photo"
                >
            `;
        }


        newBook.innerHTML = `

            ${photoHTML}

            <h3>
                ${bookName}
            </h3>

            ${typeHTML}

            <p>
                <b>Subject:</b>
                ${subject}
            </p>

            <p>
                <b>Department:</b>
                ${department}
            </p>

            <p>
                <b>Year:</b>
                ${year}
            </p>

            <p>
                <b>Condition:</b>
                ${condition}
            </p>

            ${extraHTML}

            <button onclick="toggleFavourite(this)">
                ♡ Favourite
            </button>

            <button onclick="contactSeller('${bookName}')">
                I'm Interested
            </button>

        `;


        container.appendChild(newBook);


        // Update impact counter

        let bookCount =
            document.getElementById("bookCount");

        let currentCount =
            parseInt(bookCount.innerText);

        bookCount.innerText =
            currentCount + 1;


        alert(
            "Your book has been listed successfully! 📚"
        );


        document
            .getElementById("bookForm")
            .reset();
    });


// ================= FAVOURITES =================

function toggleFavourite(button) {

    let card =
        button.parentElement;

    let title =
        card.querySelector("h3").innerText;


    if (button.innerText.includes("♡")) {

        button.innerText = "❤️ Saved";

        button.classList.add("favourite-active");


        let favouriteContainer =
            document.getElementById("favouriteContainer");


        let existing =
            document.getElementById(
                "fav-" + title.replace(/\s+/g, "-")
            );


        if (!existing) {

            let favourite =
                document.createElement("div");

            favourite.className =
                "favourite-item";

            favourite.id =
                "fav-" + title.replace(/\s+/g, "-");


            favourite.innerHTML = `
                📚 ${title}
            `;

            favouriteContainer.appendChild(
                favourite
            );
        }

    } else {

        button.innerText = "♡ Favourite";

        button.classList.remove(
            "favourite-active"
        );
    }
}


// ================= BOOK REQUEST =================

document
    .getElementById("requestForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let book =
            document.getElementById("requestBook").value;

        let subject =
            document.getElementById("requestSubject").value;


        let requestContainer =
            document.getElementById(
                "requestContainer"
            );


        let request =
            document.createElement("div");

        request.className =
            "request-card";


        request.innerHTML = `
            <h3>📖 ${book}</h3>

            <p>
                <b>Subject:</b>
                ${subject}
            </p>

            <p>
                Someone is looking for this book.
            </p>

            <button onclick="alert('You can contact the student through KitabCycle.')">
                I Have This Book
            </button>
        `;


        requestContainer.appendChild(
            request
        );


        alert(
            "Book request posted successfully! 📢"
        );


        document
            .getElementById("requestForm")
            .reset();
    });


// ================= AI ASSISTANT =================

function askAI() {

    let input =
        document
            .getElementById("aiInput")
            .value
            .toLowerCase();


    let response =
        document.getElementById("aiResponse");


    if (input.trim() === "") {

        response.innerText =
            "Please type your question.";

        return;
    }


    if (
        input.includes("math") ||
        input.includes("mathematics")
    ) {

        response.innerText =
            "📚 I found Engineering Mathematics - I. You can check the Available Books section.";

    }

    else if (
        input.includes("physics")
    ) {

        response.innerText =
            "📚 Engineering Physics is currently available. Check the Available Books section.";

    }

    else if (
        input.includes("programming") ||
        input.includes("c")
    ) {

        response.innerText =
            "💻 Programming in C is currently available on KitabCycle.";

    }

    else if (
        input.includes("how") &&
        input.includes("sell")
    ) {

        response.innerText =
            "💰 Go to 'List Your Book', enter the book details, select Sell, add the price and click Add Book.";

    }

    else if (
        input.includes("exchange")
    ) {

        response.innerText =
            "🔄 Select Exchange while listing your book and enter the book you want in exchange.";

    }

    else if (
        input.includes("give") ||
        input.includes("donate")
    ) {

        response.innerText =
            "🎁 Select Give Away when listing your book. The book will be shown as FREE.";

    }

    else {

        response.innerText =
            "🤖 You can search for books, list a book, exchange books, give books away or post a book request.";
    }
}


// ================= LOGOUT =================

function logoutStudent() {

    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");

    document.getElementById("mainWebsite").style.display = "none";
    document.getElementById("loginSection").style.display = "flex";

    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentPassword").value = "";

    document.getElementById("loginMessage").innerText = "";

}