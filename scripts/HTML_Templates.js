function createCartItemTemplate(item, addItemCallback, decreaseItemCallback, removeItemCallback) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <span>${item.dish.name} x ${item.quantity}</span>
      <div>
        <button class="cart-add">+</button>
        <button class="cart-decrease">-</button>
        <button class="cart-remove">🗑️</button>
      </div>
    `;
  
    itemElement.querySelector(".cart-add").addEventListener("click", () => addItemCallback(item.dish));
    itemElement.querySelector(".cart-decrease").addEventListener("click", () => decreaseItemCallback(item.dish));
    itemElement.querySelector(".cart-remove").addEventListener("click", () => removeItemCallback(item.dish));
  
    return itemElement;
  }
  
  function createDishTemplate(dish, addItemCallback) {
    const dishElement = document.createElement("div");
    dishElement.classList.add("dish");
    dishElement.innerHTML = `
      <h4>${dish.name}</h4>
      <div class="fos"><button class="add-to-cart" data-dish-name="${dish.name}" data-dish-price="${dish.price}">+</button>
      <span class="price-text">${dish.price.toFixed(2)} €</span></div>
    `;
  
    dishElement.querySelector(".add-to-cart").addEventListener("click", () => addItemCallback(dish));
    return dishElement;
  }