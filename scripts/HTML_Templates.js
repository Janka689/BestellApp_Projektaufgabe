function returnSummaryTemplate() {
  return `
<div class="cart-summary-container">
<div class="cart-summary">
  <p><span>Zwischensumme:</span><span id="itemsTotal"></span></p>
  <p><span>Lieferkosten:</span><span id="deliveryCost"></span></p>
  <p><span>Gesamt:</span><span id="total"></span></p>
</div>
<button class="order-button">Bestellen</button>
</div> `;
}

function returnCartItemTemplate(item) {
  return `
      <span>${item.dish.name} x ${item.quantity}</span>
      <div>
        <button class="cart-add">+</button>
        <button class="cart-decrease">-</button>
        <button class="cart-remove">🗑️</button>
      </div>
    `;
}

function returnDishTemplate(dish) {
  return  `
  <h4>${dish.name}</h4>
  <div class="fos"><button class="add-to-cart" data-dish-name="${
    dish.name
  }" data-dish-price="${dish.price}">+</button>
  <span class="price-text">${dish.price.toFixed(2)} €</span></div>
`;
}
