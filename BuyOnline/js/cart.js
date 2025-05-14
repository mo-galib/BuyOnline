
const cartContainer = document.getElementById('cart-container');
const totalQuantityEl = document.getElementById('total-quantity');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
  cartContainer.innerHTML = ''; 

  let totalQty = 0;
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalQuantityEl.textContent = '0';
    totalPriceEl.textContent = '0.00';
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalQty += item.quantity;
    totalPrice += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" width="100" />
      <div class="cart-info">
        <h4>${item.title}</h4>
        <p>$${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  totalQuantityEl.textContent = totalQty;
  totalPriceEl.textContent = totalPrice.toFixed(2);
}


function removeItem(index) {
  cart.splice(index, 1); 
  localStorage.setItem('cart', JSON.stringify(cart)); 
  displayCart(); 
}

displayCart();


checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before checking out.');
  } else {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "thankyou.html"; 
  }
});
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalCount;
}

updateCartCount();