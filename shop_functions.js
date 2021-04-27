
export var universalShopID

function trimInputs (string) {
    string = string;
    if(string.trim() == "") {
        return false;
    }
}


export function createNewShop(name) {
    let newName2 = name;
    if(trimInputs(newName2) === false) {
        document.querySelector(".warn").classList.remove("hide")
        return;        
    }
    fetch("https://donutshop-api.herokuapp.com/create-donut-shop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({"name": `${newName2}`})
            })
            .then(response => response.json())
            .then(response => {
                document.querySelector("#createShops").classList.add("hide");
                document.querySelector(".home").classList.remove("hide");
                console.log(response)
            })

}



export function getShopID(name) {
    let name5 = name;
    
    fetch("https://donutshop-api.herokuapp.com/shop-id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({"name": `${name5}`})
                })
                .then(response => response.json())
                .then(response => {
                    universalShopID = response.id
                })
}






  
  export function printRevenue(){
    fetch(`https://donutshop-api.herokuapp.com/revenue?id=${universalShopID}`, {
        method: "GET"})
    .then(response => response.json())
    .then(response => {
        response = +response.revenue
        response = response.toFixed(2)

        let currentRevenue = document.createElement('h1')
        currentRevenue.className = 'currentRev'
        currentRevenue.innerText = `Out total revenue is $${response}`
        let liRevenue = document.querySelector('.seeCurrentRevenue')
        liRevenue.prepend(currentRevenue)
    })
    .catch(error => alert(error.message));
  }
  




  export function addNewDonut(type, price) {
    let type2 = type;
    let price2 = price;
    if(trimInputs(type2) === false) {
        document.querySelector(".warn2").classList.remove("hide")
        return;
    }

    fetch(`https://donutshop-api.herokuapp.com/inventory?id=${universalShopID}`, {
      method: "GET"
    })
    .then(response => response.json())
    .then(response => {
        for(let i = 0; i < (response.donuts.length); i++) {
            if(type2 == response.donuts[i].type) {
                document.querySelector(".home").classList.add("hide");
                document.querySelector("#createDonut").classList.remove("hide");
                let noDuplicate = document.createElement('h1')
                noDuplicate.className = 'temporary'
                noDuplicate.innerText = `We already have a donut with that name. Please use another name.`
                let noDuplicate2 = document.querySelector("#duplicateWarning")
                noDuplicate2.before(noDuplicate)
                break;
            }

            else if((+price < 0.01) || (+price > 100)) {
                document.querySelector(".home").classList.add("hide");
                document.querySelector("#createDonut").classList.remove("hide");
                let invalid = document.createElement('h1')
                invalid.className = 'temporary'
                invalid.innerText = `Please enter a price greater than zero and less than 100.`
                let invalid2 = document.querySelector("#duplicateWarning")
                invalid2.before(invalid)
                break;
            }
        
            else if((type2 !== response.donuts[i].type) && (typeof(+price) == "number")) {
                price2 = +price2;
                price2 = price2.toFixed(2);
                fetch(`https://donutshop-api.herokuapp.com/create-donut-type?id=${universalShopID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({"type": `${type2}`, "price": `${price2}`})
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => {console.error(err)});
            }
        }
    })
}






  export function printMenu() {
    fetch(`https://donutshop-api.herokuapp.com/inventory?id=${universalShopID}`, {
      "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
        for(let i = 0; i < (response.donuts.length); i++) {
            let donut = document.createElement('li');
            donut.className = 'menuItem';
            donut.innerText = `Donut type: ${response.donuts[i].type} \n Price: ${response.donuts[i].price} \n Number in stock: ${response.donuts[i].count}`;

            let donutList = document.querySelector('#menuList');
            donutList.append(donut);
            }
        })
        .catch(err => {console.error(err)})
}
     




  
  export function addNewInventory(type, amount) {
    let moreCookedDonuts = type;
    let amountAdded = amount;
        fetch(`https://donutshop-api.herokuapp.com/add-donuts?id=${universalShopID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({"type": `${moreCookedDonuts}`, "count": `${amountAdded}`})
          })
          .catch(err => {console.error(err)});
    }







  
  export function buyDonut(type, amount) {
    let type1 = type;
    let amount1 = +amount;
    amount1 = Math.floor(amount1);

    fetch(`https://donutshop-api.herokuapp.com/inventory?id=${universalShopID}`, {
      method: "GET"
    })
    .then(response => response.json())
    .then(response => {
        for(let i = 0; i < (response.donuts.length); i++) {
            if(type1 == response.donuts[i].type && amount1 > response.donuts[i].count) {
                let tooMany = document.createElement('h1')
                tooMany.className = 'yourTotal'
                tooMany.innerText = `We currently only have ${response.donuts[i].count} of that type of donut in stock.`
                let seeCount = document.querySelector(".showTotal2")
                seeCount.prepend(tooMany)
                document.querySelector("#buyDonut").classList.remove("hide");
                break;
            }


            else if(amount1 < 1) {
                let tooFew = document.createElement('h1')
                tooFew.className = 'yourTotal'
                tooFew.innerText = `You must buy at least one donut.`
                let tooFew2 = document.querySelector(".showTotal2")
                tooFew2.prepend(tooFew)
                document.querySelector("#buyDonut").classList.remove("hide");
                break;
            }


            else if(type1 == response.donuts[i].type && amount1 <= response.donuts[i].count) {
                let price1 = response.donuts[i].price * amount1;
                
                fetch(`https://donutshop-api.herokuapp.com/place-order?id=${universalShopID}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({"type": `${type}`, "count": `${amount}`})
                })
                .then(response => {
                    let total = document.createElement('h1')
                    total.className = 'yourTotal'
                    total.innerText = `Your total is $${price1}.`
                    let seeTotal = document.querySelector(".showTotal2")
                    seeTotal.prepend(total)
                })        
                .catch(err => {console.error(err)});
            }   
        }
    })
    .catch(err => {console.error(err)})
  }

    
            


