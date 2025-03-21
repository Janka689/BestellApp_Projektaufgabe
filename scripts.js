class FoodItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    renderCart() {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = '';
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                this.removeItem(item.id);
                this.renderCart();
            };
            itemElement.appendChild(removeButton);
            cartContainer.appendChild(itemElement);
        });
        const totalElement = document.createElement('div');
        totalElement.textContent = `Total: $${this.getTotal().toFixed(2)}`;
        cartContainer.appendChild(totalElement);
    }
}

const cart = new Cart();

function addFoodItem(id, name, price) {
    const foodItem = new FoodItem(id, name, price);
    cart.addItem(foodItem);
    cart.renderCart();
}

// Beispiel zum Hinzufügen von Speisen
addFoodItem(1, 'Pizza', 9.99);
addFoodItem(2, 'Burger', 5.99);
addFoodItem(3, 'Salad', 4.99);