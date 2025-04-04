summaryElement.innerHTML = `
        <p><span>Zwischensumme:</span><span>${itemsTotal.toFixed(
          2
        )} €</span></p>
        <p><span>Lieferkosten:</span><span>${deliveryCost.toFixed(
          2
        )} €</span></p>
        <p><span>Gesamt:</span><span>${total.toFixed(2)} €</span></p>
    `;

    const container = document.createElement("div");
    container.classList.add("cart-summary-container");
    container.appendChild(summaryElement);

itemElement.innerHTML = `
      <span>${item.dish.name} x ${item.quantity}</span>
      <div>
        <button class="cart-add">+</button>
        <button class="cart-decrease">-</button>
        <button class="cart-remove">🗑️</button>
      </div>
    `;
 
  itemElement
    .querySelector(".cart-add")
    .addEventListener("click", () => addItemCallback(item.dish));
  itemElement
    .querySelector(".cart-decrease")
    .addEventListener("click", () => decreaseItemCallback(item.dish));
  itemElement
    .querySelector(".cart-remove")
    .addEventListener("click", () => removeItemCallback(item.dish));

  return itemElement;

dishElement.innerHTML = `
      <h4>${dish.name}</h4>
      <div class="fos"><button class="add-to-cart" data-dish-name="${
        dish.name
      }" data-dish-price="${dish.price}">+</button>
      <span class="price-text">${dish.price.toFixed(2)} €</span></div>
    `;

  dishElement
    .querySelector(".add-to-cart")
    .addEventListener("click", () => addItemCallback(dish));
  return dishElement;
