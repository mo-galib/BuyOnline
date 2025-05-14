
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 3000);

const productContainer = document.getElementById('featured-products');

fetch('https://mo-galib.github.io/products/products.json')
  .then(res => res.json())
  .then(data => {
    productContainer.innerHTML = data.slice(0,4).map(product => `
      <div class="product-card">
        <img src="${product.image}" width="150" />
        <h4>${product.title}</h4>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `).join('');
  });




function addToCart(productId) {
  fetch(`https://mo-galib.github.io/products/products.json`)
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (!product) {
        alert('Product not found!');
        return;
      }

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingIndex = cart.findIndex(item => item.id === product.id);

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.title} added to cart!`);
      updateCartCount();
    });
}


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

updateCartCount();