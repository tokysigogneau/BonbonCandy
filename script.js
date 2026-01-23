//creation of the cart array / link to the local storage
let user_cart = JSON.parse(localStorage.getItem('user_cart')) || [];
const selections = ["boissons", "bonbons",  "sales", "sucres"];

//Get the data from Json file, function because we are going to use this multiple times
async function fetchData() {
  const response = await fetch('bonboncandy.json');
  return await response.json();
}

//find product by name inside the Json file/the data loaded
function findProductByName(data, name) {
  for (const category of Object.values(data)) {
    const product = category.find(p => p.name === name);
    if (product) return product;
  }
  return null;
}

//Save the cart content to the LocalStorage 
function saveCart() {
  localStorage.setItem('user_cart', JSON.stringify(user_cart));
}

// Display product cards 
async function chargerCards(categories) {
  const data = await fetchData();
  const container = document.getElementById('produit');
  container.innerHTML = "";

  categories.forEach(categorie => {
    if (!data[categorie]) return;

    data[categorie].forEach(choice => {


      //Finish hereeeeeeeeeeeeeee
      const card = document.createElement('div');
      card.className = `card_${categorie} card`;
      card.id= `id_${choice.name}`;

      card.innerHTML = `
            <img src="img/${choice.img}" alt="${choice.name}">
            <div class="card_info">
            <h4>${choice.name}</h4>
            <h4>${'⭐'.repeat(Number(choice.score))}</h4>
            <div class="prix">${choice.price} €</div>
          </div>
          <button onclick="addToCart('${choice.name}')">Ajouter au panier</button>

      `;

      container.appendChild(card);
    });
  });
}

// Display the product in the Cart "offCanvas"
async function chargerCartCards() {
  const data = await fetchData();
  const container = document.getElementById('cart_content');
  container.innerHTML = "";

//insert message if the user_cart aray is empty
  if (user_cart.length === 0) {
    container.innerHTML = "<p>Ton panier est vide</p>";
    return;
  }

  let total = 0;

  user_cart.forEach(item => {
    const product = findProductByName(data, item.name);
    if (!product) return;

    total += Number(product.price) * item.quantity;

    const cart_card = document.createElement('div');
    cart_card.classList.add('cart_card');

    cart_card.innerHTML = `
      <div class="cart_card_img">
        <img src="img/${product.img}" height="100px" width="100px">
      </div>
      <div class="cart_card_2nd_part">
        <a href="#">${product.name}</a>
        <div class="add_more_product">
          <button onclick="decreaseQuantity('${product.name}')">-</button>
          <p>${item.quantity}</p>
          <button onclick="increaseQuantity('${product.name}')">+</button>
        </div>
      </div>
      <div class="cart_card_3rd_part">
        <button onclick="removeFromCart('${product.name}')">
          <img src="img/poubelle.png" width="10px">
        </button>
        <h4 class="cart_product_price">${product.price} €</h4>
      </div>
    `;

    container.appendChild(cart_card);
  });

  // Afficher total
  const totalDiv = document.createElement('h4');
  //toFixed(2) is used for curency to display the number of decimal to display ex: 113.17 or 17.00
  totalDiv.textContent = `Total: ${total.toFixed(2)} €`; 
  totalDiv.style.marginTop = "10px";
  container.appendChild(totalDiv);
}

// Funtions to interact with the cart
// Each end with saveCart() and chargerCartCards() to update cart after an edit

function addToCart(name) {
  const item = user_cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    user_cart.push({ name, quantity: 1 });
  }
  saveCart();
  chargerCartCards();
}

// filter() create a new array based on the parameter given
//in this case we create a new array where the item name selected won't be added to the new array
function removeFromCart(name) {
  user_cart = user_cart.filter(i => i.name !== name);
  saveCart();
  chargerCartCards();
}

function increaseQuantity(name) {
  const item = user_cart.find(i => i.name === name);
  if (item) item.quantity++;
  saveCart();
  chargerCartCards();
}

function decreaseQuantity(name) {
  const item = user_cart.find(i => i.name === name);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      removeFromCart(name);
      return;
    }
  }
  saveCart();
  chargerCartCards();
}

//empty the cart when the purchase is confirmed
function emptyCart() {
  user_cart = [];
  saveCart();
  chargerCartCards();
}


// Function to display the choosen category only from checkboxes

function categorySelection() {
  //this array group all informations needed for each category : 
  // the checkbox reference + the classname --> we need them to show/hide selected category
  const categories = [
    { checkbox: "categorie_boissons", class: ".card_boissons" },
    { checkbox: "categorie_bonbons",  class: ".card_bonbons" },
    { checkbox: "categorie_sales",    class: ".card_sales" },
    { checkbox: "categorie_sucres",   class: ".card_sucres" }
  ];

  // Select  categories that are checked and create a new array with filter() that contains them
  const active = categories.filter(cat =>
    document.getElementById(cat.checkbox).checked
  );

  // Show all products if no category are selected
  if (active.length === 0) {
    showAllProduct();
    return; //stop the function here 
  }

  //if at least 1 category is selected then we hide everything then show only the one checked 
  hideAllProduct();

  // Show only the selected categories
  active.forEach(cat => {
    document.querySelectorAll(cat.class).forEach(card => {
      card.style.display = "block";
    });
  });
}



//these 2 functions are the same : they select all elements with class "card" and the change the display
//display block to show / display none to hide

function showAllProduct(){
  const allCards = document.querySelectorAll('.card')

    allCards.forEach(card => {
      card.style.display = "block";
  });
}

function hideAllProduct(){
  const allCards = document.querySelectorAll('.card')

    allCards.forEach(card => {
      card.style.display = "none";
  });
}



// ---------- INITIALISATION ----------

chargerCards(selections);
chargerCartCards();
categorySelection();
