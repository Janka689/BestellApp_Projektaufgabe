class Dish {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.deliveryCost = 4.99; // Fixed delivery cost
    }

    addItem(dish) {
        const existingItem = this.items.find(item => item.dish.name === dish.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ dish, quantity: 1 });
        }
        this.updateCartDisplay();
    }

    decreaseItem(dish) {
        const itemIndex = this.items.findIndex(item => item.dish.name === dish.name);
        if (itemIndex > -1) {
            this.items[itemIndex].quantity--;
            if (this.items[itemIndex].quantity === 0) {
                this.items.splice(itemIndex, 1);
            }
        }
        this.updateCartDisplay();
    }

    removeItem(dish) {
        const itemIndex = this.items.findIndex(item => item.dish.name === dish.name);
        if (itemIndex > -1) {
            this.items.splice(itemIndex, 1);
        }
        this.updateCartDisplay();
    }

    calculateTotal() {
        if (this.items.length === 0) return 0; // Return 0 if the cart is empty
        const itemsTotal = this.items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
        return itemsTotal + this.deliveryCost;
    }

    updateCartDisplay() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = '';

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.dish.name} x ${item.quantity}</span>
                <div>
                    <button class="cart-add">+</button>
                    <button class="cart-decrease">-</button>
                    <button class="cart-remove">🗑️</button>
                </div>
            `;
            cartElement.appendChild(itemElement);

            itemElement.querySelector('.cart-add').addEventListener('click', () => this.addItem(item.dish));
            itemElement.querySelector('.cart-decrease').addEventListener('click', () => this.decreaseItem(item.dish));
            itemElement.querySelector('.cart-remove').addEventListener('click', () => this.removeItem(item.dish));
        });

        const summaryElement = document.createElement('div');
        summaryElement.classList.add('cart-summary');
        const itemsTotal = this.items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
        summaryElement.innerHTML = `
            <p><span>Zwischensumme:</span><span>${itemsTotal.toFixed(2)} €</span></p>
            <p><span>Lieferkosten:</span><span>${this.items.length > 0 ? this.deliveryCost.toFixed(2) : '0.00'} €</span></p>
            <p><span>Gesamt:</span><span>${this.calculateTotal().toFixed(2)} €</span></p>
        `;
        cartElement.appendChild(summaryElement);

        const orderButton = document.createElement('button');
        orderButton.textContent = 'Bestellen';
        orderButton.classList.add('order-button');
        orderButton.addEventListener('click', () => {
            if (this.items.length === 0) {
                alert('Sie haben noch nichts bestellt');
            } else {
                alert('Vielen Dank für Ihre Bestellung!');
                this.items = []; // Clear the cart after ordering
                this.updateCartDisplay();
            }
        });
        cartElement.appendChild(orderButton);
    }
}

const cart = new Cart();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const dishName = button.dataset.dishName;
            const dishPrice = parseFloat(button.dataset.dishPrice);
            const dish = new Dish(dishName, dishPrice);
            cart.addItem(dish);
        });
    });

    // Load dishes from dish.js
    displayDishes(dishesData);

    function displayDishes(dishes) {
        const categories = {
            vorspeisen: document.getElementById('vorspeisen'),
            hauptspeisen: document.getElementById('hauptspeisen'),
            getraenke: document.getElementById('getraenke'),
            nachspeisen: document.getElementById('nachspeisen')
        };

        dishes.forEach(dishData => {
            const dish = new Dish(dishData.name, dishData.price, dishData.category);
            const dishElement = document.createElement('div');
            dishElement.classList.add('dish');
            dishElement.innerHTML = `
                <h4>${dish.name}</h4>
                <button class="add-to-cart" data-dish-name="${dish.name}" data-dish-price="${dish.price}">+</button>
                <p>${dish.price.toFixed(2)} €</p>
            `;
            categories[dish.category].appendChild(dishElement);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const dishName = button.dataset.dishName;
                const dishPrice = parseFloat(button.dataset.dishPrice);
                const dish = new Dish(dishName, dishPrice);
                cart.addItem(dish);
            });
        });
    }
});