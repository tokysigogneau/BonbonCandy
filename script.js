async function chargerCards() {
  const response = await fetch('bonboncandy.json');
  const data = await response.json();

  const container = document.getElementById('produit');

  data.bonbons.forEach(bonbon => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      toto
      <img src="img/${bonbon.img}" alt="${bonbon.name}">
      <h4>${bonbon.name}</h4>
      <h4>${'⭐'.repeat(bonbon.score)}</h4>
      <div class="prix">${bonbon.price} €</div>
      <button>Ajouter au panier</button>
    `;

    container.appendChild(card);
  });
}

chargerCards();
