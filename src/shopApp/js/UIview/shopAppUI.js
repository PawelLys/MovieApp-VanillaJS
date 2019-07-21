import { DOMstrings } from './DOMstrings';

export const clearInit = () => {
    document.querySelector(DOMstrings.planMoney).textContent = `---`;
    document.querySelector(DOMstrings.spendMoney).textContent = `---`;
}

// Return input values that user wrote and change color and shape of icon if user wrote with mistakes
export const getInput = () => {
    const ob = {
        product: document.querySelector(DOMstrings.initProduct).value,
        description: document.querySelector(DOMstrings.initDescription).value,
        price: parseFloat(document.querySelector(DOMstrings.initPrice).value)
    }

    if(ob.description !== '' && typeof ob.price === "number" && ob.price > 0) return ob;
    else {
        const x = document.querySelector(DOMstrings.initBtn);
        x.classList.remove(`green`);
        x.classList.add(`red`);
        x.removeChild(x.firstChild);
        x.insertAdjacentHTML(`afterbegin`, `<ion-icon name="close-circle"></ion-icon>`);
        return false;
    }
}

// If user wrote with mistakes then after interaction return color and shape of icon on default
export const changeBtnColorBack = () => {
    const x = document.querySelector(DOMstrings.initBtn);
    x.classList.remove(`green`);
    x.classList.add(`green`);
    x.classList.remove(`red`);
    x.removeChild(x.firstChild);
    x.insertAdjacentHTML(`afterbegin`, `<ion-icon name="checkmark-circle"></ion-icon>`);
}

// Change photo near to Select
export const changePhoto = () => {
    const product = document.querySelector(DOMstrings.initProduct).value;
    const x = document.querySelector(DOMstrings.initIcon);
    x.removeChild(x.firstChild);
    x.insertAdjacentHTML(`afterbegin`, `<img src="css/img/${product}.png">`);
}

// When Select an Option it will autofill description and price
export const fillInput = price => {
    const typeProduct = document.querySelector(DOMstrings.initProduct).value;

    if(typeProduct !== `no_img`) document.querySelector(DOMstrings.initDescription).value = typeProduct;
    else document.querySelector(DOMstrings.initDescription).value = ``;

    document.querySelector(DOMstrings.initPrice).value = price;
}

// Add new element on page
export const displayItem = (ob, id, mainColumn) => {
    let text = `
                <div class="shop__list__el__new" id="add__%1%">
                    <div class="shop__photo"><img src="css/img/%butter%.png"></div>
                    <div class="shop__item"><p class="shop__title">%titleButter%</p>
                        <button class="move__btn yellow"><ion-icon name="arrow-forward"></ion-icon></button>
                        <button class="remove__btn red"><ion-icon name="close"></ion-icon></button>
                    </div>
                    <div class="shop__cash"><p>%5.23% PLN</p></div>
                </div>`;

    if(!mainColumn) {
        text = text.replace(`shop__list__el__new`, `shop__list__done__new`);
        text = text.replace(`add`, `move`);
        text = text.replace(`arrow-forward`, `arrow-back`);

    }
    
    text = text.replace(`%1%`, id);
    text = text.replace(`%butter%`, ob.product);
    if(ob.product === `no_img`) text = text.replace(`png`, `jpg`);
    text = text.replace(`%titleButter%`, ob.description);
    text = text.replace(`%5.23%`, ob.price);

    if(mainColumn) document.querySelector(DOMstrings.addNewEl).insertAdjacentHTML(`beforeend`, text);
    else document.querySelector(DOMstrings.moveNewEl).insertAdjacentHTML(`beforeend`, text);
}

// Display money user should take and already spend on page
export const displayFinalMoney = money => {
    if(money[0] === 0) money[0] = `---`;
    if(money[1] === 0) money[1] = `---`;
    if(typeof money[0] === `number`) document.querySelector(DOMstrings.planMoney).textContent = money[0].toFixed(2);
    else document.querySelector(DOMstrings.planMoney).textContent = money[0];
    if(typeof money[1] === `number`) document.querySelector(DOMstrings.spendMoney).textContent = money[1].toFixed(2);
    else document.querySelector(DOMstrings.spendMoney).textContent = money[1];
}

// Delete element from page
export const deleteDisplay = el => {
    const x = document.getElementById(el);
    x.parentNode.removeChild(x);
}

//Function which disable inputs and button
export const disabledBtn = () => {
    changeBtnColorBack();
    document.querySelector(DOMstrings.initProduct).disabled = true;
    document.querySelector(DOMstrings.initDescription).disabled = true;
    document.querySelector(DOMstrings.initPrice).disabled = true;
    document.querySelector(DOMstrings.initBtn).disabled = true;
}

//Function which enable inputs and button
export const enabledBtn = () => {
    document.querySelector(DOMstrings.initProduct).disabled = false;
    document.querySelector(DOMstrings.initDescription).disabled = false;
    document.querySelector(DOMstrings.initPrice).disabled = false;
    document.querySelector(DOMstrings.initBtn).disabled = false;
}

// After click button this function will clear input's
export const clearInput = () => {
    const arr = document.querySelectorAll(`${DOMstrings.initDescription}, ${DOMstrings.initPrice}`);

    for(let i = 0; i < arr.length; i++) arr[i].value = ``;
    arr[0].focus();

    const arrSelect = document.querySelector(DOMstrings.initProduct).options;
    if(arrSelect.selectedIndex !== 0) arrSelect.selectedIndex = 0;

    changePhoto();
}
