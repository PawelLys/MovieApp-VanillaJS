import { DOMstrings as DOM } from './UIview/DOMstrings';
import { clearInit, getInput, changeBtnColorBack, changePhoto, fillInput, displayItem, 
    displayFinalMoney, deleteDisplay, disabledBtn, enabledBtn, clearInput } from './UIview/shopAppUI';
import { addNewItem, getPrice, getMoney, moveMainData, deleteMainData, 
    isPlanList, isBoughtList } from './models/shopAppData';
        

// All eventListeners
document.querySelector(DOM.initProduct).addEventListener("focus", changeBtnColorBack);
document.querySelector(DOM.initProduct).addEventListener("change", changeProduct);
document.querySelector(DOM.initDescription).addEventListener("focus", changeBtnColorBack);
document.querySelector(DOM.initPrice).addEventListener("focus", changeBtnColorBack);
        
window.addEventListener(`scroll`, () => {
    const height = document.querySelector(DOM.sectionShop).offsetTop * 0.9;
            
    if(window.scrollY > height) {
        enabledBtn();
        document.querySelector(DOM.initBtn).addEventListener(`click`, newElementSetup);
        document.addEventListener(`keypress`, event => {
            if(event.key === 13 || event.which === 13) newElementSetup();
        });
    } else disabledBtn();
});

document.querySelector(DOM.shopBtnLeftColumn).addEventListener(`click`, event => {
    const element = event.target.parentNode;
            
    if(element.classList.contains(DOM.moveBtn)) moveItem(element.parentNode.parentNode.id);
    if(element.classList.contains(DOM.deleteBtn)) deleteItem(element.parentNode.parentNode.id);
    displayIntroText();
});

document.querySelector(DOM.shopBtnRightColumn).addEventListener(`click`, event => {
    const element = event.target.parentNode;

    if(element.classList.contains(DOM.moveBtn)) moveItem(element.parentNode.parentNode.id);
    if(element.classList.contains(DOM.deleteBtn)) deleteItem(element.parentNode.parentNode.id);
    displayIntroText();
});
        

// After choosing an Option in Select we call function to change photo and fill Inputs
function changeProduct() {
    changePhoto();
    fillInput(getPrice(document.querySelector(DOM.initProduct).value));
}

// Function to call functions to display new element on UI
function displayUI(inputValues, id, mainColumn = true) {
    displayItem(inputValues, id, mainColumn);
    const money = getMoney();
    displayFinalMoney(money);
}

// Function which is rensponsible from adding new element on Data and UI side
function newElementSetup() {
    const inputObject = getInput();
    if(inputObject) {
        const ID = addNewItem(inputObject); 
        displayUI(inputObject, ID);
        clearInput();
    }
    displayIntroText();
}

// Function which is responsible for moving element between columns
function moveItem(el) {
    const elArr = el.split(`__`);
    const elID = parseInt(elArr[1]);

    if(elArr[0] === `add`) {
        const [inputObject, id] = moveMainData(elID);
        displayUI(inputObject, id, false);
    } else if(elArr[0] === `move`) {
        const [inputObject, id] = moveMainData(elID, `boughtList`);
        displayUI(inputObject, id, true);
    }
    deleteDisplay(el);
}

// Function which is reponsible for removing element from columns
function deleteItem(el) {
    const elArr = el.split(`__`);
    const elID = parseInt(elArr[1]);

    if(elArr[0] === `add`) deleteMainData(elID);
    else if(elArr[0] === `move`) deleteMainData(elID, `boughtList`);
        
    deleteDisplay(el);
    displayFinalMoney(getMoney());
}

function displayIntroText() {
    const planList = isPlanList();
    const boughtList = isBoughtList();
    if(planList) document.querySelector(DOM.shopIntroLeftColumn).style.visibility = 'visible';
    else document.querySelector(DOM.shopIntroLeftColumn).style.visibility = 'hidden';
    if(boughtList) document.querySelector(DOM.shopIntroRightColumn).style.visibility = 'visible';
    else document.querySelector(DOM.shopIntroRightColumn).style.visibility = 'hidden';
}

const init = () => {
    clearInit();
    disabledBtn();
}
init();
