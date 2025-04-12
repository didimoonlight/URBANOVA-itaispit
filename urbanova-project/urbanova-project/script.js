document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const clearCartButton = document.getElementById("clear-cart");
    let count = 0;
    let cart = [];

    // Učitava proizvode iz JSON fajla
    fetch("product.json")
        .then((res) => res.json())
        .then((products) => {
            const container = document.getElementById("products-container");
            products.forEach((product, index) => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                    <button class="add-to-cart">Add to Cart</button>
                    <button class="remove-from-cart">Remove from Cart</button>
                `;

                const addButton = card.querySelector(".add-to-cart");
                const removeButton = card.querySelector(".remove-from-cart");

                addButton.addEventListener("click", () => {
                    // Dodaj proizvod u korpu
                    cart.push(product);
                    count++;
                    cartCount.textContent = count;
                    cartCount.style.display = "inline-block";
                    addButton.disabled = true;  
                    removeButton.style.display = "inline-block"; 
                });

                removeButton.addEventListener("click", () => {
                    // Ukloni proizvod iz korpe
                    cart = cart.filter((item) => item !== product);
                    count--;
                    cartCount.textContent = count;
                    if (count === 0) cartCount.style.display = "none";
                    addButton.disabled = false;  
                    removeButton.style.display = "none"; 
                });

                container.appendChild(card);
            });
        })
        .catch((err) => console.error("Greška pri učitavanju proizvoda:", err));

    // Funkcija za brisanje svih proizvoda iz korpe
    clearCartButton.addEventListener("click", () => {
        cart = [];
        count = 0;
        cartCount.textContent = count;
        cartCount.style.display = "none";
        // Resetovanje dugmadi
        document.querySelectorAll(".add-to-cart").forEach(button => button.disabled = false);
        document.querySelectorAll(".remove-from-cart").forEach(button => button.style.display = "none");
    });
});
// funkcija za link MENS i WOMENS
const tooltip = document.getElementById('tooltip');

document.getElementById('mens-link').addEventListener('click', () => {
  showTooltip();
});

document.getElementById('womens-link').addEventListener('click', () => {
  showTooltip();
});

function showTooltip() {
  tooltip.classList.add('show');

  setTimeout(() => {
    tooltip.classList.remove('show');
  }, 2000); // traje 2 sekunde
}
