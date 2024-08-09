let myDishes = ['Beefsteak', 'Baked Potatoes', 'Cheese Burger', 'Spaghetti Bolognese', 'Salat'];
let prices = ['12,95', '8,75', '5,55', '6,87', '4,56'];
let images = ['img/grilled-8042308_1280.jpg', 'img/potatoes-8600211_1280.jpg', 'img/ai-generated-8036255_1280.jpg', 'img/spaghetti-bolognese-7517639_1280.jpg', 'img/ai-generated-8406441_1280.png'];

let basketDishes = [];
let basketPrices = [];
let amounts = [];

function init() {
  let mainContainer = document.getElementById('mainContainer');
  mainContainer.innerHTML = getMainHtml();
  render();
  renderBasket();
}

function render() {
  document.getElementById('dishes').innerHTML = '';
  for (let i = 0; i < myDishes.length; i++) {
    let completeDishes = document.getElementById('dishes')
    completeDishes.innerHTML += getDishHtml(myDishes, images, i, prices);
  }
}

function renderBasket() {
  document.getElementById('addToBasket').innerHTML = '';
  for (let i = 0; i < basketDishes.length; i++) {
    let completeBasket = document.getElementById('addToBasket')
    completeBasket.innerHTML += getBasketHtml(basketDishes, i, basketPrices, amounts);
  }
  calcSum();
}

function addToBasket(dish) {
  let dishIndex = myDishes.indexOf(dish);
  if (dishIndex === -1) {
    console.error('Dish not found:', dish);
    return;
  }
  let basketIndex = basketDishes.indexOf(dish);
  if (basketIndex === -1) {
    basketDishes.push(dish);
    basketPrices.push(prices[dishIndex]);
    amounts.push(1);
  } else {
    amounts[basketIndex]++;
  }
  renderBasket();
}

function deleteFromBasket(dish) {
  let basketIndex = basketDishes.indexOf(dish);
  if (basketIndex !== -1) {
    amounts[basketIndex]--;
    if (amounts[basketIndex] <= 0) {
      basketDishes.splice(basketIndex, 1);
      basketPrices.splice(basketIndex, 1);
      amounts.splice(basketIndex, 1);
    }
    renderBasket();
  }
}

function calcSum() {
  let sum = 0;
  for (let i = 0; i < basketPrices.length; i++) {
    sum += parseFloat(basketPrices[i].replace(',', '.')) * amounts[i];
  }
  document.getElementById('finalSum').innerHTML = sum.toFixed(2).replace('.', ',');
}

function showResponsiveBasket() {
  let mainLeft = document.getElementById('mainLeft');
  mainLeft.classList.add('d-none');
  let mainRight = document.getElementById('mainRight');
  mainRight.classList.add('showResponsiveBasket');
  mainRight.classList.remove('d-none');
  mainRight.style.display = "flex";
}

function returnButton() {
  let mainLeft = document.getElementById('mainLeft');
  mainLeft.classList.remove('d-none');
  let mainRight = document.getElementById('mainRight');
  mainRight.classList.remove('showResponsiveBasket');
  mainRight.classList.remove('d-none');
  if (window.innerWidth <= 768) {
    mainRight.style.display = "none";
  }
}

window.addEventListener("resize", function () {
  const mainRight = document.getElementById('mainRight');
  if (window.innerWidth > 1400) {
    mainRight.style.display = "flex";
  } else {
    mainRight.style.display = "";
  }
});

function order() {
  let finalSum = parseFloat(document.getElementById('finalSum').innerText.replace(',', '.'));
  let orderMessage = document.getElementById('orderMessage');
  if (finalSum <= 0) {
    orderMessage.innerHTML = `Bestellung nicht möglich: Kein Artikel im Warenkorb.`;
    showMessage(orderMessage);
  } else {
    orderMessage.innerHTML = `Bestellung ist unterwegs`;
    showMessage(orderMessage);
    resetBasket();
  }
}

function showMessage(orderMessage) {
  orderMessage.style.display = 'block';
  setTimeout(() => {
    orderMessage.innerHTML = '';
    orderMessage.style.display = 'none';
  }, 2000);
}

function resetBasket() {
  basketDishes = [];
  basketPrices = [];
  amounts = [];
  renderBasket();
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      returnButton();
    }, 2000);
  }
}