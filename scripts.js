class Dish {
    constructor(name, price) {
        this.name = name;
        this.price = price;
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

    removeItem(dish) {
        const itemIndex = this.items.findIndex(item => item.dish.name === dish.name);
        if (itemIndex > -1) {
            this.items[itemIndex].quantity--;
            if (this.items[itemIndex].quantity === 0) {
                this.items.splice(itemIndex, 1);
            }
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
            const removeButton = document.createElement('button');
            removeButton.textContent = '🗑️';
            removeButton.addEventListener('click', () => this.removeItem(item.dish));
            itemElement.appendChild(addButton);
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
});