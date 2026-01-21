
//This function serve to fetch the date from the JSON file 
//It takes a table of "categories" as parameters and will display items in each categories
async function chargerCards(categories) {
  const response = await fetch('bonboncandy.json');
  const data = await response.json();

  const container = document.getElementById('produit');
  container.innerHTML = ""; // vider avant affichage

  categories.forEach(categorie => {
    if (!data[categorie]) return; //if the result is empty, it will return nothing and stop the function

    data[categorie].forEach(choice => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="img/${choice.img}" alt="${choice.name}">
        <div class="card_info">
        <h4>${choice.name}</h4>
        <h4>${'⭐'.repeat(choice.score)}</h4>
        <div class="prix">${choice.price} €</div>
        </div>

        <button onclick="addToCart('${choice.name}')">Ajouter au panier</button>
      `;
      

      container.appendChild(card);
    });
  });
}


//This function is used to display the element inside the user_cart[] variable 

async function chargerCartCards() {
  const response = await fetch('bonboncandy.json');
  const data = await response.json();

  const container = document.getElementById('cart_content');
  container.innerHTML = ""; // vider avant affichage

    if (!user_cart || user_cart.length === 0) return;

    user_cart.forEach(name => {
      const choice = data.find(item => item.name === name);
      if (!choice) return;

      const cart_card = document.createElement('div');
      cart_card.classList.add('cart_card');

      cart_card.innerHTML = `
        <div class="cart_card_img">
          <img src="img/${choice.img}" height="100px" alt="">
        </div>

        <div class="cart_card_2nd_part">
          <a href="link-to-article">${choice.name}</a>
          <div class="add_more_product">
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
        </div>

        <div class="cart_card_3rd_part">
          <button>
            <img src="img/poubelle.png" width="10px" alt="">
          </button>
          <h4 class="cart_product_price">${choice.price} €</h4>
        </div>
      `;

      container.appendChild(cart_card);
    });
  
}




//chargerCards(["bonbons", "boissons"]);

const selections = ["bonbons", "boissons"];
chargerCards(selections);

const user_cart = ["sucette rouge"]
chargerCartCards()

//Add an item to cart
function addToCart(product){ 
  user_cart.push(product)
}

//remove specific item from the cart
function removeFromCart(product){

}


//Empty the cart
function emptyCart(){
  user_cart = []
}









