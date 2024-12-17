document.addEventListener("DOMContentLoaded", () => {
    const booksContainer = document.getElementById("books-container");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let books = [];

    function fetchBooks() {
        fetch("https://stephen-king-api.onrender.com/api/books")
            .then(response => response.json())
            .then(data => {
                books = data.data.slice(0, 20);
                renderBooks(books);
            })
            .catch(error => {
                console.error("Error al obtener los libros:", error);
                booksContainer.innerHTML = "<p class='text-danger'>Hubo un error al cargar los libros.</p>";
            });
    }
    function renderBooks(books) {
        booksContainer.innerHTML = "";
        books.forEach(book => {
            const card = document.createElement("div");
            card.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
            const price = (Math.random() * (50 - 10) + 10).toFixed(2);
            book.price = price;
            card.innerHTML = `
                <div class="card text-bg-light" style="max-width: 18rem;">
                    <div class="card-header">${book.Title}</div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Año:</strong> ${book.Year}</li>
                            <li class="list-group-item"><strong>Editorial:</strong> ${book.Publisher}</li>
                            <li class="list-group-item"><strong>Páginas:</strong> ${book.Pages}</li>
                            <li class="list-group-item"><strong>Precio:</strong> $${price}</li>
                        </ul>
                    </div>
                    <div class="card-footer text-center">
                        <button class="add-to-cart" data-id="${book.id}">Añadir al carrito</button>
                    </div>
                </div>
            `;
            booksContainer.appendChild(card);
        });
        const buttons = document.querySelectorAll(".add-to-cart");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = parseInt(event.target.getAttribute("data-id"));
                agregarAlCarrito(bookId);
            });
        });
    }
    function agregarAlCarrito(bookId) {
        const book = books.find(item => item.id === bookId);
        if (!book) return;

        const existingProduct = cart.find(item => item.id === bookId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: book.id,
                Title: book.Title,
                price: parseFloat(book.price),
                quantity: 1
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        mostrarMensaje("El libro ha sido añadido al carrito.");
    }
    function mostrarMensaje(mensaje) {
        console.log("Mostrando mensaje:", mensaje);
        const messageContainer = document.createElement("div");
        messageContainer.textContent = mensaje;
        messageContainer.className = "alert alert-success position-fixed top-0 end-0 m-3";
        document.body.appendChild(messageContainer);

        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.remove();
        }, 2000);
    }
    
    fetchBooks();
});


