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
    this.deliveryCost = 4.99;
  }

  addItem(dish) {
    const existingItem = this.items.find(
      (item) => item.dish.name === dish.name
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ dish, quantity: 1 });
    }
    this.updateCartDisplay();
    this.updateCartCount();
  }

  decreaseItem(dish) {
    const itemIndex = this.items.findIndex(
      (item) => item.dish.name === dish.name
    );
    if (itemIndex > -1) {
      this.items[itemIndex].quantity--;
      if (this.items[itemIndex].quantity === 0) {
        this.items.splice(itemIndex, 1);
      }
    }
    this.updateCartDisplay();
    this.updateCartCount();
  }

  removeItem(dish) {
    const itemIndex = this.items.findIndex(
      (item) => item.dish.name === dish.name
    );
    if (itemIndex > -1) {
      this.items.splice(itemIndex, 1);
    }
    this.updateCartDisplay();
    this.updateCartCount();
  }

  calculateTotal() {
    if (this.items.length === 0) return 0;
    const itemsTotal = this.items.reduce(
      (sum, item) => sum + item.dish.price * item.quantity,
      0
    );
    return itemsTotal + this.deliveryCost;
  }

  updateCartDisplay() {
    const cartElement = document.getElementById("cart");
    cartElement.innerHTML = "";

    this.items.forEach((item) => {
      const itemElement = createCartItemTemplate(
        item,
        (dish) => this.addItem(dish),
        (dish) => this.decreaseItem(dish),
        (dish) => this.removeItem(dish)
      );
      cartElement.appendChild(itemElement);
    });

    const itemsTotal = this.items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
    const summaryElement = createCartSummaryTemplate(itemsTotal, this.deliveryCost, this.calculateTotal());
    cartElement.appendChild(summaryElement);

    const orderButton = document.createElement("button");
    orderButton.textContent = "Bestellen";
    orderButton.classList.add("order-button");
    orderButton.addEventListener("click", () => {
      if (this.items.length === 0) {
        this.showPopup("Sie haben noch nichts bestellt");
      } else {
        this.showPopup("Vielen Dank für Ihre Bestellung!");
        this.items = [];
        this.updateCartDisplay();
        this.updateCartCount();
      }
    });
    cartElement.appendChild(orderButton);
  }

  updateCartCount() {
    const cartCountElement = document.querySelector(".burger-menu .cart-count");
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }

  showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popup.classList.remove("hidden");

    const popupClose = document.getElementById("popup-close");
    popupClose.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  }
}

const cart = new Cart();

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.getElementById("burger-menu");
  const basketNav = document.getElementById("basket-nav");
  const imgrestaurant_all = document.querySelector(".img_restaurant_all");

  burgerMenu.addEventListener("click", () => {
    basketNav.classList.toggle("visible");
    imgrestaurant_all.classList.toggle("dimmed");
  });

 
  const cartCountElement = document.createElement("div");
  cartCountElement.classList.add("cart-count");
  cartCountElement.textContent = "0";
  burgerMenu.appendChild(cartCountElement);

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const dishName = button.dataset.dishName;
      const dishPrice = parseFloat(button.dataset.dishPrice);
      const dish = new Dish(dishName, dishPrice);
      cart.addItem(dish);
    });
  });

  displayDishes(dishesData);

  function displayDishes(dishes) {
    const categories = {
      vorspeisen: document.getElementById("vorspeisen"),
      hauptspeisen: document.getElementById("hauptspeisen"),
      getraenke: document.getElementById("getraenke"),
      nachspeisen: document.getElementById("nachspeisen"),
    };

    dishes.forEach((dishData) => {
      const dish = new Dish(dishData.name, dishData.price, dishData.category);
      const dishElement = createDishTemplate(dish, (dish) => cart.addItem(dish));
      categories[dish.category].appendChild(dishElement);
    });
  }

  const footer = document.querySelector("footer");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + windowHeight >= documentHeight - 50) {
      footer.classList.add("visible");
    } else {
      footer.classList.remove("visible");
    }
  });
});
