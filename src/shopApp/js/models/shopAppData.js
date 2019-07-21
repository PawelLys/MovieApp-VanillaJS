// Class for mainData
class Item {
    constructor(type, name, price, number) {
        this.product = type;
        this.description = name;
        this.price = price;
        this.id = number
    }
}
    
// Object with data
const mainData = {
    planList: [],
    boughtList: []
}
    
// Object with price
const priceData = {
    butter: 4.29,
    chips: 5.59,
    bread: 1.14,
    juice: 3.43
}
    
// Find, remove and return element in mainData when we will give ID
const findData = (findID, column) => {
    let findIndex = null, item, reverseColumn;
                
    mainData[column].forEach((cur, index) => {
        if(cur.id === findID) findIndex = index; 
    });
    
    if(findIndex !== null) {
        item = mainData[column].splice(findIndex, 1); 
        return item;
    }
}
    
// Add new items to mainData
export const addNewItem = (inputObject, column = `planList`) => {
    let id;
    mainData[column].length > 0 ? id = mainData[column][mainData[column].length - 1].id + 1 : id = 0;
    
    const addItem = new Item(inputObject.product, inputObject.description, inputObject.price, id);
    mainData[column].push(addItem);
    return id;
}
    
// Return price from priceData
export const getPrice = nameProduct => nameProduct !== `no_img` ? priceData[nameProduct] : null;
    
// Calculate final value of money
export const getMoney = () => {
    let planMoney = 0, spendMoney = 0;
    
    if(mainData.planList.length > 0) {
        mainData.planList.forEach(cur => {
            planMoney += cur.price;
        })
    }
    if(mainData.boughtList.length > 0) {
        mainData.boughtList.forEach(cur => {
            spendMoney += cur.price;
        })
    }
    return [planMoney, spendMoney];
}
    
// Find corrent ID in array mainData.planList/boughtList and move element from that index to other array
export const moveMainData =  (findID, column = `planList`) => {
    let item = findData(findID, column);    
    item = Object.assign({}, ...item);
    delete item.id;
    
    column === `planList` ? column = `boughtList` : column = `planList`;
    const id = addNewItem(item, column);
    
    return [item, id];
}
    
// Delete element from mainData
export const deleteMainData = (findID, column = `planList`) => {
    findData(findID, column);  
}

export const isPlanList = () => mainData.planList.length > 0 ? true : false;
export const isBoughtList = () => mainData.boughtList.length > 0 ? true : false;