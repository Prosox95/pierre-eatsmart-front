import "./style.css";

type Pizza = {
    description: string;
    id: number;
    nom: string;
    prix: number;
};

const menu: Pizza[] = [
    {
        description:
            "sauce tomate premium, origan, huile d'olive extra vierge, anchois, olive",
        id: 1,
        nom: "Anchois 23cm",
        prix: 7.9,
    },
    {
        description:
            "sauce tomate premium, origan, huile d'olive extra vierge, emmental, basilic, olive",
        id: 2,
        nom: "Emmental 23cm",
        prix: 7.9,
    },
    {
        description:
            "sauce tomate premium, origan, huile d'olive extra vierge, mozzarella",
        id: 3,
        nom: "Margherita 23cm",
        prix: 7.9,
    },
];

const appDiv = document.querySelector<HTMLDivElement>("#app")!;

// crée une variable pour stocker le HTML à injecter dans la page
let htmlAInjecter = `
  <header>
    <h1>EatSmart - Carte du Restaurant</h1>
  </header>
  <main class="menu-container">
`;

// boucle sur les pizzas du menu pour créer une carte pour chacune d'entre elles
menu.forEach((pizza) => {
    htmlAInjecter += `
    <div class="card">
      <h3>${pizza.nom}</h3>
      <p>${pizza.description}</p>
      <p><strong>Prix : ${pizza.prix}€</strong></p>
    </div>
  `;
});

// ferme balise main
htmlAInjecter += `
  </main>
`;

// injecte le HTML
appDiv.innerHTML = htmlAInjecter;
