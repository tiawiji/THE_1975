const products = document.querySelectorAll('.product');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

products.forEach(product => {
    const addToCartBtn = product.querySelector('.add-to-cart');
    const name = addToCartBtn.getAttribute('data-name');
    const price = parseFloat(addToCartBtn.getAttribute('data-price'));

    addToCartBtn.addEventListener('click', () => {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name,
                price,
                quantity: 1,
            });
        }

        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - $${itemTotal.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart.');
    } else {
        // Here you can implement the transaction/payment logic.
        // For this example, we will just log the cart items and total price.
        console.log(cart);
        console.log(`Total Price: $${totalPrice.textContent}`);
        alert('Checkout completed! Thank you for your purchase.');
        cart = [];
        updateCart();
    }
});
