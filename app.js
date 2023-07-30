// Initialize the cart as an empty array to store selected items
let cartItems = [];
let cartCount = 0; // Initialize the cart count to 0

// Function to fetch data from the API and update the page with product details
function fetchProductDetails() {
  fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
    .then(response => response.json())
    .then(data => {
      // Update the DOM with product details from the API response
      document.getElementById('productImage').src = data.imageURL;
      document.getElementById('productName').innerText = data.title;
      document.getElementById('productPrice').innerText = '$' + data.price;
      document.getElementById('productDetails').innerText = data.description;

      // Fetch and display size options from the API
      const sizeOptions = data.sizeOptions;
      const sizeContainer = document.getElementById('sizeOptions');
      sizeContainer.innerHTML = ''; // Clear any previous options

      sizeOptions.forEach(size => {
        const sizeButton = document.createElement('button');
        sizeButton.classList.add('size-btn');
        sizeButton.setAttribute('data-size', size.label); // Set the size label as a data attribute
        sizeButton.innerText = size.label; // Use the label property to get the size name (S, M, L)
        sizeButton.onclick = () => {
          selectSize(size.label); // Call the selectSize function with the selected size
        };
        sizeContainer.appendChild(sizeButton);
      });
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
}

// Function to handle the selection of a size option
function selectSize(size) {
  // Remove the "selected" class from all size buttons
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => button.classList.remove('selected'));

  // Add the "selected" class to the clicked size button
  const selectedSizeButton = document.querySelector(`button[data-size="${size}"]`);
  selectedSizeButton.classList.add('selected');
}

// Function to add a product to the cart
function addToCart() {
  const selectedSize = document.querySelector('.size-btn.selected');

  // Check if a size option is selected before adding to the cart
  if (!selectedSize) {
    showError('Please select a size before adding to cart.');
    return; // Exit the function if size is not selected
  }

  // Get the selected size value
  const size = selectedSize.getAttribute('data-size');

  // Get the product details
  const productName = document.getElementById('productName').innerText;
  const productPrice = document.getElementById('productPrice').innerText;
  const imageURL = document.getElementById('productImage').src;

  // Check if the item with the same size is already in the cart
  const existingItemIndex = cartItems.findIndex(item => item.size === size);

  if (existingItemIndex !== -1) {
    // If the item already exists, increase the quantity
    cartItems[existingItemIndex].quantity++;
  } else {
    // If the item does not exist, add it to the cart with quantity 1
    cartItems.push({
      size,
      productName,
      productPrice,
      imageURL,
      quantity: 1,
    });
  }

  // Clear any previous error message
  clearError();

  // Update the mini cart with the selected items
  updateMiniCart();

  // Update the cart count
  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Update the cart count display
  updateCartCount();

  // // Show a success message (optional)
  // alert('Item added to cart!');
}

// Function to update the mini cart with the selected items
function updateMiniCart() {
    const miniCart = document.getElementById('miniCart');
    miniCart.innerHTML = ''; // Clear the existing items in the mini cart
  
    cartItems.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('mini-cart-item');
  
      const itemImage = document.createElement('img');
      itemImage.src = item.imageURL; // Update the image URL with the base URL of the API
     // itemImage.alt = item.productName;
      itemImage.classList.add('mini-cart-item-image');
  
      const itemDetails = document.createElement('div');
      itemDetails.classList.add('mini-cart-item-details');
  
      const itemName = document.createElement('p');
      itemName.innerText = item.productName;

      const itemQuantity = document.createElement('p');
      itemQuantity.innerText = 'x' + item.quantity;
  
      const itemPrice = document.createElement('p');
      itemPrice.innerText = '$' + item.productPrice;
  
  
      const itemSize = document.createElement('p');
      itemSize.innerText = 'Size: ' + item.size;
  
      itemDetails.appendChild(itemName);
      itemDetails.appendChild(itemPrice);
      itemDetails.appendChild(itemSize);
  
      cartItemDiv.appendChild(itemImage);
      //cartItemDiv.appendChild(itemDetails);
      cartItemDiv.appendChild(itemQuantity);
  
      miniCart.appendChild(cartItemDiv);
    });
  }
  
// Function to show an error message
function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerText = message;
}

// Function to clear any previous error message
function clearError() {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerText = '';
}

// Function to toggle the visibility of the mini cart
function toggleCart() {
    const miniCart = document.getElementById('miniCart');
    miniCart.style.display = miniCart.style.display === 'none' ? 'block' : 'none';
    
  }

// Function to update the cart count display
function updateCartCount() {
  const cartCountText = document.getElementById('cartCount');
  cartCountText.innerText = `My Cart (${cartCount})`;
}

// Call the function to fetch and display product details
fetchProductDetails();
