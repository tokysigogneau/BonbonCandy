
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
        <h4>${choice.name}</h4>
        <h4>${'⭐'.repeat(choice.score)}</h4>
        <div class="prix">${choice.price} €</div>
        <button>Ajouter au panier</button>
      `;

      container.appendChild(card);
    });
  });
}

//chargerCards(["bonbons", "boissons"]);

const selections = ["bonbons", "boissons"];
chargerCards(selections);





