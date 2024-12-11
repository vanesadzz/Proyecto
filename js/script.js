document.addEventListener("DOMContentLoaded", () => {
    const booksContainer = document.getElementById("books-container");
  
    // Función para obtener los libros de la API
    function fetchBooks() {
      fetch("https://potterapi-fedeperin.vercel.app/en/books")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((books) => {
          books.forEach((book) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4";
  
            // Renderizar la información del libro
            cardDiv.innerHTML = `
              <div class="card mt-3">
                <img src="${book.cover}" 
                     class="card-img-top" 
                     alt="${book.title}" 
                     style="height: auto; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text"><strong>Título original:</strong> ${book.originalTitle}</p>
                  <p class="card-text"><strong>Fecha de publicación:</strong> ${book.releaseDate}</p>
                  <p class="card-text"><strong>Páginas:</strong> ${book.pages}</p>
                  <button class="btn btn-success mt-auto">Agregar al carrito</button>
                </div>
              </div>
            `;
  
            // Botón para agregar a favoritos
            const botonAgregar = cardDiv.querySelector("button");
            botonAgregar.addEventListener("click", () => {
              agregarAlCarrito(book);
            });
  
            // Añadir la card al contenedor
            booksContainer.appendChild(cardDiv);
          });
        })
        .catch((error) => {
          console.error("Error al obtener los libros:", error);
          booksContainer.innerHTML = "<p class='text-danger'>Hubo un error al cargar los libros. Intenta nuevamente más tarde.</p>";
        });
    }
  
    // Función para agregar libros a favoritos (almacenados en localStorage)
    function agregarAlCarrito(book) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const existe = carrito.some((item) => item.title === book.title);
  
      if (existe) {
        alert(`${book.title} ya está en tu carrito.`);
      } else {
        carrito.push(book);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${book.title} ha sido agregado a tu carrito.`);
      }
    }
  
    // Carga inicial de libros
    fetchBooks();
  });
  