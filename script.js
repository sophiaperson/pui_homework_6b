// script.js

function CartItem(size, color, quantity, name, price, imageUrl) {
  this.size = size
  this.color = color
  this.quantity = quantity
  this.name = name
  this.price = price
  this.imageUrl = imageUrl
}

function addItemToCart() {
  let sizeSel = document.getElementsByName("size")
  var size = ""
  for (let i=0; i<4; i++) {
    if (sizeSel[i].checked) {
      size = sizeSel[i].value
    }
  }
  let colorSel = document.getElementsByName("color")
  var color = ""
  for (let i=0; i<4; i++) {
    if (colorSel[i].checked) {
      color = colorSel[i].value
    }
  }
  let quantSel = document.getElementById("quantity")
  var quantity = quantSel.options[quantSel.selectedIndex].value
  
  let name = document.getElementById("product-detail-title").innerHTML
  let price = document.getElementById("product-detail-price").innerHTML
  let imageUrl = document.getElementById("product1").src
  const cartItem = new CartItem(size, color, quantity, name, price, imageUrl)

  console.log("Size: " + size + ", Color: " + color + ", Quantity: " + quantity + ", Name: " + name + ", Price: " + price)
  
  let cartString = sessionStorage.getItem('cartItems')
  let cartArray = JSON.parse(cartString)
  cartArray.push(cartItem)
  let newCartString = JSON.stringify(cartArray)


  console.log("old storage")
  console.log(sessionStorage.getItem("cartItems"))

  sessionStorage.setItem('cartItems', newCartString)

  console.log("new storage")
  console.log(sessionStorage.getItem("cartItems"))


  return cartItem;
}

function displaySidebar(cartItem) {
  let sidebar = document.getElementById("cart-sidebar")
  sidebar.boxShadow = "-200px 0px 1000px gray"
  sidebar.style.width = "400px"
  
  let message = document.getElementById("cart-message")
  
  let nameStr = capitalizeFirstLetter(cartItem.name)
  let quantityStr = cartItem.quantity
  let sizeStr = capitalizeFirstLetter(cartItem.size)
  let colorStr = capitalizeFirstLetter(cartItem.color)
  let itemString = nameStr + " (" + sizeStr + ", " + colorStr + ", " + quantityStr + ")"

  message.innerHTML = itemString + " was added to your cart!"
}

function closeSidebar() {
  document.getElementById("cart-sidebar").style.width = "0";
  sidebar.boxShadow = "none"
}

function displayCartNotification() {
  let itemsString = sessionStorage.getItem('cartItems')
  let items = JSON.parse(itemsString)
  let numItems = items.length
  let notification = document.getElementById("cart-notification")
  if (notification != null) {
    notification.innerHTML = numItems.toString()
    notification.style.visibility = "visible"
  }
  
}


function addToCart() {
  let cartItem = addItemToCart()
  displaySidebar(cartItem)
  displayCartNotification()
}

function hoverSize(size){
  let selSize = document.getElementById("selected-size")
  selSize.innerHTML = size
}

function hoverColor(color) {
  let selColor = document.getElementById("selected-color")
  selColor.innerHTML = color
}

function mouseOutSize() {
  let sizeSel = document.getElementsByName("size")
  var size = ""
  for (let i=0; i<4; i++) {
    if (sizeSel[i].checked) {
      size = sizeSel[i].value
    }
  }
  size = capitalizeFirstLetter(size)
  document.getElementById("selected-size").innerHTML = size
}

function mouseOutColor() {
  let colorSel = document.getElementsByName("color")
  var color = ""
  for (let i=0; i<4; i++) {
    if (colorSel[i].checked) {
      color = colorSel[i].value
    }
  }
  color = color.charAt(0).toUpperCase() + color.slice(1)
  document.getElementById("selected-color").innerHTML = color
}

function capitalizeFirstLetter(str) {
  str = str.charAt(0).toUpperCase() + str.slice(1)
  return str
}

function displayCartItem(item) {
  let itemGrid = document.createElement("div")
  itemGrid.classList.append("grid-container")
}

function init() {
  if (sessionStorage.getItem('cartItems') == null) {
    sessionStorage.setItem('cartItems', '[]')
  }
}

function onLoad() {
  init()
  let itemsString = sessionStorage.getItem('cartItems')
  let items = JSON.parse(itemsString)
  let numItems = items.length
  let notification = document.getElementById("cart-notification")
  if (notification != null) {
    if (numItems !== 0) {
      notification.innerHTML = numItems.toString()
      notification.style.visibility = "visible"
    }
  }
  console.log(items)
  console.log(notification.innerHTML)
}
