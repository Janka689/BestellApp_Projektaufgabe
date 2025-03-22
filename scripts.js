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

    updateCartDisplay() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = '';
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.dish.name} x ${item.quantity}`;
            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.addEventListener('click', () => this.addItem(item.dish));
            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.addEventListener('click', () => this.decreaseItem(item.dish));
            const removeButton = document.createElement('button');
            removeButton.textContent = '🗑️';
            removeButton.addEventListener('click', () => this.removeItem(item.dish));
            itemElement.appendChild(addButton);
            itemElement.appendChild(decreaseButton);
            itemElement.appendChild(removeButton);
            cartElement.appendChild(itemElement);
        });
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
                <p>Price: $${dish.price.toFixed(2)}</p>
                <button class="add-to-cart" data-dish-name="${dish.name}" data-dish-price="${dish.price}">+</button>
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