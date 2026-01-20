async function chargerCards(choice) {
  const response = await fetch('bonboncandy.json');
  const data = await response.json();

  const container = document.getElementById('produit');

  data.bonbons.forEach(choice => {
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
}

chargerCards("bonbon");


// ,rkky
