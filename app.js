// Function to fetch data from the API and update the page with product details
function fetchProductDetails() {
    fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
      .then(response => response.json())
      .then(data => {
        // Update the DOM with product details from the API response
        document.getElementById('productImage').src = data.imageURL;
        document.getElementById('productName').innerText = data.title;
        document.getElementById('productPrice').innerText = 'Price: $' + data.price;
        document.getElementById('productDetails').innerText = data.description;
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }
  
  // Call the function to fetch and display product details
  fetchProductDetails();
  
  let cartOpen = false;
  const selectedSizes = {};
  
  function toggleCart() {
    const cartItems = document.getElementById('cartItems');
    cartOpen = !cartOpen;
    cartItems.style.display = cartOpen ? 'block' : 'none';
  }
  
  function selectSize(size) {
    selectedSizes[size] = true;
    document.getElementById('productDetails').innerText = `Size: ${size}`;
    hideErrorMessage();
  }
  
  function addToCart() {
    const productName = document.getElementById('productName').innerText;
    const productPrice = document.getElementById('productPrice').innerText;
    const selectedSize = document.getElementById('productDetails').innerText.replace('Size: ', '');
  
    if (!selectedSizes[selectedSize]) {
      showErrorMessage('Please select a size before adding to cart.');
      return;
    }
  
    hideErrorMessage();
    addItemToCart(productName, productPrice, selectedSize);
  }
  
  function showErrorMessage(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
  }
  
  function hideErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';
  }
  
  function addItemToCart(name, price, size) {
    const cartItems = document.getElementById('cartItems');
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
  
    const itemInfo = document.createElement('div');
    itemInfo.classList.add('item-info');
  
    const itemName = document.createElement('p');
    itemName.textContent = name;
    const itemSize = document.createElement('p');
    itemSize.textContent = `Size: ${size}`;
    const itemPrice = document.createElement('p');
    itemPrice.textContent = price;
  
    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemSize);
    itemInfo.appendChild(itemPrice);
  
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
      cartItems.removeChild(cartItem);
      delete selectedSizes[size];
    };
  
    cartItem.appendChild(itemInfo);
    cartItem.appendChild(removeButton);
  
    cartItems.appendChild(cartItem);
  }
  