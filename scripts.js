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

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            const dishName = button.dataset.dishName;
            const dishPrice = parseFloat(button.dataset.dishPrice);
            const dish = new Dish(dishName, dishPrice);
            cart.removeItem(dish);
        });
    });
});