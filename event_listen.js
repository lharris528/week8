import {addNewDonut, addNewInventory, printMenu, printRevenue, buyDonut, createNewShop, getShopID, universalShopID} from "./shop_functions.js";

let submitSelectedShopBtn = document.querySelector('#submitSelectedShop');
submitSelectedShopBtn.addEventListener('click', function(event) {
    document.querySelector(".home").classList.remove("hide");
    document.querySelector(".pickShop").classList.add("hide");
    let namevalue = document.querySelector(".selectShop").value;
    getShopID(namevalue)
})

let chooseShopBtn = document.querySelector('#chooseShop');
chooseShopBtn.addEventListener('click', function(event) {
    document.querySelector(".home").classList.add("hide");
    document.querySelector(".pickShop").classList.remove("hide");
});






let selectShopInput = document.querySelector(".selectShop");


selectShopInput.addEventListener('click', function(event) {
    document.querySelectorAll('.optionList').forEach(e => e.remove());
    fetch("https://donutshop-api.herokuapp.com/shops", {
        method: "GET"})
    .then(response => response.json())
    .then(response => {
        for(let i = 0; i < response.length; i++) {
            let newOption = document.createElement('option')
            newOption.className = "optionList"
            newOption.value = response[i]
            newOption.innerText = response[i]
            let addedTo = document.querySelector("#shopNames")
            addedTo.appendChild(newOption)
        }
    });
});














//create new shop section
let btn1 = document.querySelector('#newShop');
btn1.addEventListener('click', function(event) {
    document.querySelector(".warn").classList.add("hide")
    document.querySelector("#createShops").classList.remove("hide");
    document.querySelector(".home").classList.add("hide");
});

let submitNewShopBtn = document.querySelector('#submitNewShop').addEventListener('click', function(event) {
    let newName = document.querySelector("#newShopName").value;
    createNewShop(newName);
});

let escapeCreateShopBtn = document.querySelector('#escapeCreateShop').addEventListener('click', function(event) {
    document.querySelector("#createShops").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
});
//end of section





//create new donut type section
let btn2 = document.querySelector('#newVariety').addEventListener('click', function(event) {
    document.querySelector(".warn2").classList.add("hide")
    document.querySelector("#createDonut").classList.remove("hide");
    document.querySelector(".home").classList.add("hide");
});

let endCreateBtn = document.querySelector('#endCreate').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelectorAll('.temporary').forEach(e => e.remove());
    document.querySelector("#createDonut").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
    let type = document.querySelector("#newVarietyDonut").value;
    let price = document.querySelector("#newPrice").value;
    addNewDonut(type, price);
});

let escapeCreateBtn = document.querySelector('#escapeCreateDonut').addEventListener('click', function(event) {
    document.querySelectorAll('.temporary').forEach(e => e.remove());
    document.querySelector("#createDonut").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
});
//end of section




//add inventory section
let btn3 = document.querySelector('#addInven');
btn3.addEventListener('click', function(event) {
    document.querySelector("#cookDonut").classList.remove("hide");
    document.querySelector(".home").classList.add("hide");
});

let endAddBtn = document.querySelector('#endAdd').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector("#cookDonut").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
    let typeToAdd = document.querySelector("#cookedDonut").value;
    let amountToAdd = document.querySelector("#amountCookedDonut").value;
    addNewInventory(typeToAdd, amountToAdd);
});

let escapeAddBtn = document.querySelector('#escapeCookDonut').addEventListener('click', function(event) {
    document.querySelector("#cookDonut").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
});
//end of section






//see donut menu section
let btn4 = document.querySelector('#seeInven');
btn4.addEventListener('click', function(event) {
    document.querySelector("#viewInventory").classList.remove("hide");
    document.querySelector(".home").classList.add("hide");
    document.querySelectorAll('.menuItem').forEach(e => e.remove());
    printMenu();
});

let endViewInventoryBtn = document.querySelector('#endViewInventory').addEventListener('click', function(event) {
    document.querySelector("#viewInventory").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
});
//end of section





//Revenue observation section
let btn5 = document.querySelector('#seeRev');
btn5.addEventListener('click', function(event) {
    document.querySelector("#viewRevenue").classList.remove("hide");
    document.querySelector(".home").classList.add("hide");
    printRevenue()
});

let endViewRevenueBtn = document.querySelector('#endViewRevenue').addEventListener('click', function(event) {
    document.querySelectorAll('.currentRev').forEach(e => e.remove());
    document.querySelector("#viewRevenue").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
});
//end of section





//Donut purchase section
let btn6 = document.querySelector('#buy');
btn6.addEventListener('click', function(event) {
    document.querySelector("#buyDonut").classList.remove("hide");
    document.querySelector(".home").classList.add("hide");
});

let submitBuyDonutBtn = document.querySelector('#submitBuyDonut').addEventListener('click', function(event) {
    let typeToBuy = document.querySelector("#typeToBuy").value;
    let amountToBuy = document.querySelector("#amountToBuy").value;
    document.querySelectorAll('.yourTotal').forEach(e => e.remove());
    document.querySelector("#buyDonut").classList.add("hide");
    document.querySelector("#showTotal").classList.remove("hide");

    buyDonut(typeToBuy, amountToBuy)
});

let endBuyDonutBtn = document.querySelector('#endBuyDonut').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector("#showTotal").classList.add("hide");
    document.querySelector("#buyDonut").classList.add("hide");
    document.querySelectorAll('.yourTotal').forEach(e => e.remove());
    document.querySelector(".home").classList.remove("hide");
});

let escapeBuyDonutBtn = document.querySelector('#escapeBuyDonut').addEventListener('click', function(event) {
    document.querySelectorAll('.yourTotal').forEach(e => e.remove());
    document.querySelector("#showTotal").classList.add("hide");
    document.querySelector("#buyDonut").classList.add("hide");
    document.querySelector(".home").classList.remove("hide");
});
//end of section