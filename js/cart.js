document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const emptyCartButton = document.getElementById("empty-cart");
    const checkoutButton = document.getElementById("checkout");
    const checkoutMessage = document.getElementById("checkout-message");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartContainer.innerHTML = "";
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p class='text-muted'>Tu carrito está vacío.</p>";
            return;
        }

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.className = "card mb-2";
            cartItem.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.Title}</h5>
                    <p class="card-text">Cantidad: ${item.quantity}</p>
                    <p class="card-text">Precio: $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="btn-remove" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll(".btn-remove");
        removeButtons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = parseInt(event.target.getAttribute("data-id"));
                eliminarDelCarrito(bookId);
            });
        });
    }
    function eliminarDelCarrito(bookId) {
        cart = cart.filter(item => item.id !== bookId);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    if (emptyCartButton) {
        emptyCartButton.addEventListener("click", () => {
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            checkoutMessage.innerHTML = "";
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cart.length === 0) {
                checkoutMessage.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        No hay productos en el carrito para finalizar la compra.
                    </div>
                `;
                return;
            }

            const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

            checkoutMessage.innerHTML = `
                <div class="card text-bg">
                    <div class="card-body text-center">
                        <h5 class="card-title">¡Compra Finalizada!</h5>
                        <p class="card-text">El total de tu compra es: <strong>$${totalPrice.toFixed(2)}</strong></p>
                        <p class="card-text">Gracias por tu compra.</p>
                    </div>
                </div>
            `;
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    }
    renderCart();
});
