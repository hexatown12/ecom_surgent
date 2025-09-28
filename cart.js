const cartContainer = document.getElementById("cart-container");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">Your Cart</h2>
      <p class="text-gray-600 mb-6">Your cart is empty</p>
      <button class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
        <a href="index.html">Browse Products</a>
      </button>
    `;
        return;
    }

    let itemsHTML = cart.map((item, index) => `
    <div class="flex items-center justify-between bg-white shadow p-4 mb-4 rounded-lg">
      <div class="flex items-center space-x-4">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain">
        <div class="text-left">
          <h3 class="font-semibold">${item.title}</h3>
          <p class="text-gray-600">$${item.price}</p>
          <p class="text-sm text-gray-500">Qty: ${item.quantity || 1}</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <p class="font-bold text-lg">$${(item.price * (item.quantity || 1)).toFixed(2)}</p>
        <button onclick="removeItem(${index})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
          Remove
        </button>
      </div>
    </div>
  `).join("");

    cartContainer.innerHTML = `
    <h2 class="text-2xl font-bold mb-6 text-center">Your Cart</h2>
    <div>${itemsHTML}</div>
    <div class="mt-6 flex justify-between items-center">
      <p class="font-semibold text-lg">Total: $${cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0).toFixed(2)}</p>
      <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Checkout</button>
    </div>
  `;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();