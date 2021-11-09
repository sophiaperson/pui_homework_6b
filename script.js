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

function getItemTotalPrice(item) {
  // remove the dollar sign from the string representing the price of 1 item
  let priceStr = item.price.slice(1)
  let priceNum = Number(priceStr)
  // multiply the price of 1 item with the quantity of items
  let totalPriceNum = priceNum * Number(item.quantity)
  // turn this number back into a string and attach a $ before it
  let totalPriceStr = "$" + totalPriceNum.toString()
  return totalPriceStr
}

function createCartItem(item) {
  // create elements to attach to DOM in cart flexbox 
  let itemGrid = document.createElement("div")
  itemGrid.classList.add("cart-item-grid", "grid-container")

  let itemImage = document.createElement("img")
  itemImage.classList.add("cart-item-image")
  itemImage.setAttribute("src", item.imageUrl)

  let itemDiv = document.createElement("div")

  let itemName = document.createElement("div")
  itemName.classList.add("cart-item-name")
  itemName.innerHTML = item.name

  let itemInfoGrid = document.createElement("div")
  itemInfoGrid.classList.add("cart-item-info-grid", "grid-container")

  let itemSelectedDetails = document.createElement("div")
  itemSelectedDetails.classList.add("cart-item-selected-details")

  let sizeDiv = document.createElement("div")
  let sizeLabel = document.createElement("label")
  sizeLabel.classList.add("detail-label")
  sizeLabel.innerHTML = "Size: "
  let itemSize = document.createElement("label")
  itemSize.classList.add("detail-label", "bold")
  itemSize.innerHTML = capitalizeFirstLetter(item.size)
  let colorDiv = document.createElement("div")
  let colorLabel = document.createElement("label")
  colorLabel.classList.add("detail-label")
  colorLabel.innerHTML = "Color: "
  let itemColor = document.createElement("label")
  itemColor.classList.add("detail-label", "bold")
  itemColor.innerHTML = capitalizeFirstLetter(item.color)

  let quantityDiv = document.createElement("div")
  quantityDiv.classList.add("cart-item-quantity")
  let quantityLabel = document.createElement("label")
  quantityLabel.classList.add("detail-label")
  quantityLabel.innerHTML = "Quantity: "
  let itemQuantity = document.createElement("label")
  itemQuantity.classList.add("detail-label", "bold")
  itemQuantity.innerHTML = item.quantity

  let priceDiv = document.createElement("div")
  priceDiv.classList.add("cart-item-price")
  let priceLabel = document.createElement("label")
  priceLabel.classList.add("detail-label")
  priceLabel.innerHTML = "Price: "
  let itemPrice = document.createElement("label")
  itemPrice.classList.add("detail-label", "bold")
  itemPrice.innerHTML = getItemTotalPrice(item)

  let closeButton = document.createElement("button")
  closeButton.classList.add("cart-item-close")
  closeButton.innerHTML = "Remove"
  closeButton.addEventListener("click", function () {
    removeItem(this)
  }
) 

  // attach items to item grid container
  itemGrid.appendChild(itemImage)
  itemGrid.appendChild(itemDiv)
  itemDiv.appendChild(itemName)
  itemDiv.appendChild(itemInfoGrid)
  itemInfoGrid.appendChild(itemSelectedDetails)
  itemSelectedDetails.appendChild(sizeDiv)
  sizeDiv.appendChild(sizeLabel)
  sizeDiv.appendChild(itemSize)
  itemSelectedDetails.appendChild(colorDiv)
  colorDiv.appendChild(colorLabel)
  colorDiv.appendChild(itemColor)
  itemInfoGrid.appendChild(quantityDiv)
  quantityDiv.appendChild(quantityLabel)
  quantityDiv.appendChild(itemQuantity)
  itemInfoGrid.appendChild(priceDiv)
  priceDiv.appendChild(priceLabel)
  priceDiv.appendChild(itemPrice)
  itemInfoGrid.appendChild(closeButton)

  // return the element with all the nodes that can later be attached to the DOM
  return itemGrid
}


// remove cart item from sessionStorage
function removeItem(element) {
  // get array of all cart items from sessionStorage
  let itemsString = sessionStorage.getItem('cartItems')
  let items = JSON.parse(itemsString)

  console.log(element)

  // find item in DOM to remove
  let infoGrid = element.parentNode // div class="cart-item-info-grid"
  console.log(infoGrid)
  let itemDiv = infoGrid.parentNode // div 
  console.log(itemDiv)
  let itemGrid = itemDiv.parentNode // div class="cart-item-grid"
  console.log(itemGrid)
  let itemsFlex = itemGrid.parentNode // div id="cart-items-flex"
  console.log(itemsFlex)

  // remove item from all cart items in array 
  let itemsFlexCollection = itemsFlex.children
  let itemsFlexArray = Array.from(itemsFlexCollection)
  let index = itemsFlexArray.indexOf(itemGrid)
  items.splice(index, 1)

  // update sessionStorage for all cart items
  let newItemsString = JSON.stringify(items)
  sessionStorage.setItem("cartItems", newItemsString)
  window.location.reload()
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
  // display cart if the current page is the cart page
  if (document.getElementById("cart-container") != null) {
    let cartFlex = document.getElementById("cart-items-flex")
    for (let i = 0; i < numItems; i++) {
      let item = items[i]
      itemElement = createCartItem(item)
      cartFlex.appendChild(itemElement)
    }
  }
}
