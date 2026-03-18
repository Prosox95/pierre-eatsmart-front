// Fichier d'importation
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

// affichage console
console.log(menu);

// div principale de notre page HTML
const appDiv = document.querySelector<HTMLDivElement>("#app")!;

// contenaire html qui va accueillir les cartes des pizzas
let htmlAInjecter = '<div class="menu-container">';

// boucle sur chaque pizza pour créer sa "carte" HTML
menu.forEach((pizza) => {
    htmlAInjecter += `
    <div class="card">
      <h3>${pizza.nom}</h3>
      <p>${pizza.description}</p>
      <p><strong>Prix : ${pizza.prix}€</strong></p>
    </div>
  `;
});

htmlAInjecter += "</div>";

// injecte le HTML généré dans la div principale
appDiv.innerHTML = htmlAInjecter;
