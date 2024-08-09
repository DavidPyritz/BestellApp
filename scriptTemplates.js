function getMainHtml() {
    return `
    <div class="mainLeft" id="mainLeft">
        <div class="backgroundPictureHeadArea">
            <img class="atf-image" src="./img/beef-2509104_1280.jpg" />
        </div>
        <div class="favoriteDishes">
            <h2>beliebte Gerichte</h2>
            <a href="#Beefsteak">Beefsteak</a>
            <a href="#BakedPotatoes">Baked Potatoes</a>
            <a href="#CheeseBurger">Cheese Burger</a>
            <a href="#SpaghettiBolognese">Spaghetti Bolognese</a>
            <a href="#Salat">Salat</a>
        </div>
        <div class="dishes" id="dishes">
        </div>
    </div>    
    <div class="mainRight" id="mainRight">
        <div class="basket">
            <h3>Warenkorb</h3>
            <div id="addToBasket" class="basketDishes">
            </div>
            <div id="finalSum" class="subtotal">
                <button onclick="returnButton()">Zurück</button>
                <h3>Zwischensumme</h3>
            </div>
            <div class="order" onclick="order()">
                <h3>bestellen</h3>
            </div>
            <div class="orderOnTheWay" id="orderMessage" style="display: none;"></div>
        </div>
        <button id="order2" class="responsiveBasket" onclick="returnButton()">schliesse Warenkorb</button>
    </div>
    `;
}

function getDishHtml(myDishes, images, i, prices) {
    return `
    <div class="dishHeader" id="${myDishes[i].replace(' ', '')}">
        <div class="dishHeaderInfo">
            <h2>${myDishes[i]}</h2>
            <div class="addToBasketStyle">
                <h2>${prices[i]}</h2>
                <button class="dishesButton" onclick="addToBasket('${myDishes[i]}')">+</button>
            </div>
        </div>
        <img class="backgroundPictureAllDishes" src="${images[i]}">
        <div class="dishesPrice"></div>
    </div>
    `;
}

function getBasketHtml(basketDishes, i, basketPrices, amounts) {
    return `
    <div class="singleBasketElement">
        <div>${basketDishes[i]}</div>
        <div>${basketPrices[i]}</div>
        <div class="dishPriceAmount">
            <button class="BasketButtonMinusPlus" onclick="deleteFromBasket('${basketDishes[i]}')">-</button>
            <div>${amounts[i]}</div>
            <button class="BasketButtonMinusPlus" onclick="addToBasket('${basketDishes[i]}')">+</button>
        </div>
    </div>
    `;
}