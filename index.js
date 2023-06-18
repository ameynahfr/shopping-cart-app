import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-cart-app-e681f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingCartInDB = ref(database, "shoppingCart")



const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-btn")
const shoppingList = document.getElementById("shopping-list")

addButton.addEventListener("click", function() {
    const newItem = inputField.value
    
    if (newItem === "") return alert("Please enter a valid item")
    push(shoppingCartInDB, newItem)
    clearInputField()
    

})

onValue(shoppingCartInDB, function(snapshot) {
    if(snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
        clearShoppingList()
    
        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            addItem(currentItem)
        }
    }
    else {
        shoppingList.innerHTML = "No items added... yet"
    }
   
})

function addItem(item) {
    let itemID = item[0]
    let itemValue = item[1]
    //shoppingList.innerHTML += `<li>${item}</li>`

    let liEl = document.createElement("li")

    liEl.textContent = itemValue

    liEl.addEventListener("dblclick", function() {

        let exactLocationInDB = ref(database, `shoppingCart/${itemID}`)
        remove(exactLocationInDB)
    })

    

    shoppingList.append(liEl)

}

function clearShoppingList() {
    shoppingList.innerHTML = ""
}

function clearInputField() {
    inputField.value=""

}

