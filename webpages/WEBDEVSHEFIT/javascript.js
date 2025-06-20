// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    const form = document.querySelector("form");

    // Add an event listener for the form submission
    form.addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the values from the form fields
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        // Display an alert with the user's input
        alert(`Thank you for contacting us, ${name}!\n\nYour message:\n${message}\n\nWe will get back to you at ${email} or ${phone}.`);

        // Optionally, you can reset the form after submission
        form.reset();
    });
});

// Thank You Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Store order details in localStorage for persistence
    const orderDetails = {
        items: ['Latte', 'Cappuccino'],
        total: 87.00,
        orderNumber: Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleString()
    };

    // Display order confirmation
    function displayOrderConfirmation() {
        const orderSummary = document.createElement('div');
        orderSummary.className = 'order-summary';
        
        orderSummary.innerHTML = `
            <h2>Order Confirmation</h2>
            <p><strong>Order #:</strong> ${orderDetails.orderNumber}</p>
            <p><strong>Date:</strong> ${orderDetails.date}</p>
            <p><strong>Items:</strong> ${orderDetails.items.join(', ')}</p>
            <p><strong>Total:</strong> R${orderDetails.total.toFixed(2)}</p>
        `;
        
        document.querySelector('h1').after(orderSummary);
    }

    // Add click event to contact link
    document.querySelector('a[href="contact.html"]').addEventListener('click', function(e) {
        e.preventDefault();
        alert("You'll be redirected to our contact page. Our team is available 24/7 to assist you!");
        window.location.href = 'contact.html';
    });

    // Show thank you message with animation
    function showThankYouMessage() {
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.textContent = 'Thank you for choosing Bumbu Coffee Shop!';
        document.body.prepend(thankYouMessage);
        
        setTimeout(() => {
            thankYouMessage.classList.add('show');
        }, 500);
    }

    // Initialize page functions
    function init() {
        displayOrderConfirmation();
        showThankYouMessage();
        
        // Add event listener for print button
        const printButton = document.createElement('button');
        printButton.textContent = 'Print Receipt';
        printButton.className = 'print-btn';
        printButton.addEventListener('click', () => window.print());
        document.querySelector('footer').before(printButton);
    }

    init();
});

// Main Coffee Shop Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Menu Data (could be fetched from an API in a real application)
    const menuItems = {
        coffee: [
            { id: 1, name: 'Espresso', price: 34.99, image: 'pictures/jir93cii.png' },
            { id: 2, name: 'Cappuccino', price: 49.80, image: 'pictures/cappuccino1.webp' },
            { id: 3, name: 'Latte', price: 29.50, image: 'pictures/GJDmKr3_TS3Qpm6KEL9UKUQKUO4.jpg' },
            { id: 4, name: 'Special Drinks', price: 25.00, image: 'pictures/special drink.jpg' },
            { id: 5, name: 'Snacks', price: 24.50, image: 'pictures/l-intro-1670602155.jpg' }
        ],
        tea: [
            { id: 6, name: 'Rooibos', price: 12.50 },
            { id: 7, name: 'Green Tea', price: 24.99 },
            { id: 8, name: 'Herbal Tea', price: 22.50 }
        ]
    };

    // Shopping cart functionality
    const cart = {
        items: [],
        total: 0,
        addItem: function(item, quantity) {
            const existingItem = this.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({...item, quantity});
            }
            this.calculateTotal();
            this.updateCartDisplay();
        },
        calculateTotal: function() {
            this.total = this.items.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0);
        },
        updateCartDisplay: function() {
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
                cartCount.textContent = this.items.reduce((count, item) => 
                    count + item.quantity, 0);
            }
        }
    };

    // Initialize the page
    function init() {
        renderMenuItems();
        setupEventListeners();
        initializeCart();
    }

    // Render menu items dynamically
    function renderMenuItems() {
        const coffeeList = document.querySelector('h3:nth-of-type(1)').nextElementSibling;
        const teaList = document.querySelector('h3:nth-of-type(2)').nextElementSibling;

        menuItems.coffee.forEach(item => {
            const li = createMenuItemElement(item, true);
            coffeeList.appendChild(li);
        });

        menuItems.tea.forEach(item => {
            const li = createMenuItemElement(item, false);
            teaList.appendChild(li);
        });
    }

    // Create menu item element
    function createMenuItemElement(item, hasImage) {
        const li = document.createElement('li');
        li.dataset.id = item.id;
        
        if (hasImage) {
            const img = document.createElement('img');
            img.src = item.image;
            img.width = 400;
            img.alt = item.name;
            li.appendChild(img);
        }

        const nameSpan = document.createElement('span');
        nameSpan.textContent = `${item.name} - R${item.price.toFixed(2)}`;
        li.appendChild(nameSpan);

        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity-selector';

        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.classList.add('quantity-btn');
        minusBtn.addEventListener('click', () => adjustQuantity(item.id, -1));

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '0';
        quantityInput.value = '1';
        quantityInput.className = 'quantity-input';

        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.classList.add('quantity-btn');
        plusBtn.addEventListener('click', () => adjustQuantity(item.id, 1));

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            if (quantity > 0) {
                cart.addItem(item, quantity);
                showNotification(`${quantity} ${item.name}(s) added to cart`);
                quantityInput.value = '1';
            }
        });

        quantityDiv.append(minusBtn, quantityInput, plusBtn);
        li.append(quantityDiv, addToCartBtn);
        return li;
    }

    // Adjust quantity
    function adjustQuantity(id, change) {
        const input = document.querySelector(`li[data-id="${id}"] .quantity-input`);
        let value = parseInt(input.value) || 0;
        value += change;
        if (value < 0) value = 0;
        input.value = value;
    }

    // Setup form submission
    function setupEventListeners() {
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                items: cart.items,
                total: cart.total,
                orderDate: new Date().toLocaleString()
            };

            // In a real app, send this to a server
            console.log('Order submitted:', formData);
            
            // Show confirmation
            showOrderConfirmation(formData);
            
            // Reset form and cart
            form.reset();
            cart.items = [];
            cart.total = 0;
            cart.updateCartDisplay();
        });
    }

    // Initialize cart UI
    function initializeCart() {
        const nav = document.querySelector('nav ul');
        const cartLink = document.createElement('li');
        cartLink.innerHTML = `
            <a href="#" id="cart-link">
                Cart (<span id="cart-count">0</span>)
            </a>
        `;
        nav.appendChild(cartLink);
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Show order confirmation
    function showOrderConfirmation(orderData) {
        const main = document.querySelector('main') || document.body;
        const confirmation = document.createElement('div');
        confirmation.className = 'order-confirmation';
        
        confirmation.innerHTML = `
            <h2>Order Confirmation</h2>
            <p>Thank you for your order, ${orderData.name}!</p>
            <div class="order-summary">
                <h3>Order Summary</h3>
                <table>
                    ${orderData.items.map(item => `
                        <tr>
                            <td>${item.quantity} x ${item.name}</td>
                            <td>R${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                    <tr class="total">
                        <td>Total</td>
                        <td>R${orderData.total.toFixed(2)}</td>
                    </tr>
                </table>
                <p>We'll email the receipt to ${orderData.email}</p>
                <p>Expected delivery time: 30-45 minutes</p>
            </div>
        `;
        
        main.appendChild(confirmation);
    }

    // Initialize the application
    init();
});

// JavaScript for Bamboo Coffee Shop Inquiries

// Function to show a popup alert when the order is submitted
function showPopup() {
    alert("Thank you for your order! We will process it shortly.");
}

// Add event listener to the order form
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Display confirmation message
    const confirmationMessage = `
        Thank you, ${name}!
        You have ordered ${quantity} of ${product}.
        We will contact you at ${email} or ${phone} for any updates.
        Additional notes: ${message}
    `;
    
    alert(confirmationMessage); // Show the confirmation message
    showPopup(); // Call the showPopup function
});

<script src="https://maps.app.goo.gl/1A3eEvw2QK2iXkTCA" async defer> </script>
   

