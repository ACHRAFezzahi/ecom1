
const products = [
    {
        id: 1,
        name: "Nike Air Max",
        price: 950,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 2,
        name: "Adidas Ultraboost Light",
        price: 650,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600"
    },
    {
        id: 3,
        name: "Nike Air Force 1",
        price: 120,
        category: "shoes",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Air_Force_1.JPG/960px-Air_Force_1.JPG"
    },
    {
        id: 4,
        name: "Nike Air Max 90",
        price: 140,
        category: "shoes",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Air_Max_90.png"
    },
    {
        id: 5,
        name: "Nike TN (Air Max Plus)",
        price: 170,
        category: "shoes",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Air_Max_Plus_Hyper_Blue.jpg/960px-Air_Max_Plus_Hyper_Blue.jpg"
    }
];

let cart = [];
let currentCategory = "all";

const productsGrid = document.getElementById("productsGrid");

function displayProducts(list) {
    productsGrid.innerHTML = "";

    if (list.length === 0) {
        productsGrid.innerHTML = "<p>Aucun produit trouvé.</p>";
        return;
    }

    list.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.price} DH</p>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
    });
}

function filterProducts(category, button) {
    currentCategory = category;

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    applyFilters();
}

function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();

    const filtered = products.filter(product => {
        const matchCategory =
            currentCategory === "all" ||
            product.category === currentCategory;

        const matchSearch = product.name.toLowerCase().includes(search);

        return matchCategory && matchSearch;
    });

    displayProducts(filtered);
}

document.getElementById("searchInput")
    .addEventListener("input", applyFilters);

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const count = cart.reduce((sum, p) => sum + p.quantity, 0);

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cartTotal").textContent = total + " DH";

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Votre panier est vide.</p>";
    }

    cart.forEach(product => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${product.name}</strong>
                    <p>${product.quantity} x ${product.price} DH</p>
                </div>
                <button onclick="removeFromCart(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
}

function toggleCart() {
    document.getElementById("cartPanel").classList.toggle("open");
    document.getElementById("cartOverlay").classList.toggle("open");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

function checkout() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    const phone = "212600000000";

    let message = "Bonjour SPADRI SPORT, je souhaite commander :\n\n";

    cart.forEach(product => {
        message += `${product.name} x${product.quantity} = ${product.price * product.quantity} DH\n`;
    });

    const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

    message += `\nTotal : ${total} DH`;

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}

displayProducts(products);
updateCart();
