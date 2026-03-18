import "./style.css";

// Définition du type pour les plats
type Plats = {
  description: string;
  id: number;
  nom: string;
  prix: number;
};

// cible la div principale
const appDiv = document.querySelector<HTMLDivElement>("#app")!;

const panier: Plats[] = []; // tableau pour stocker les plats ajoutés au panier

// Fonction dédiée à la mise à jour visuelle du panier
function mettreAJourPanier() {
  const cartItemsDiv = document.querySelector<HTMLDivElement>("#cart-items");
  // 1. On cible la balise <span> qui contient le prix total
  const totalPrixSpan = document.querySelector<HTMLSpanElement>("#total-prix");

  if (!cartItemsDiv || !totalPrixSpan) return;

  if (panier.length === 0) {
    cartItemsDiv.innerHTML = "<p>Votre panier est vide</p>";
    totalPrixSpan.textContent = "0.00"; // On remet le total à zéro si le panier est vide
    return;
  }

  let htmlPanier = "";
  // 2. On crée une variable pour stocker la somme
  let total = 0;

  panier.forEach((plat) => {
    htmlPanier += `
      <div class="cart-item">
        <span>${plat.nom}</span>
        <span>${plat.prix}€</span>
      </div>
    `;
    // 3. À chaque tour de boucle, on ajoute le prix du plat au total
    total += Number(plat.prix);
  });

  cartItemsDiv.innerHTML = htmlPanier;

  // 4. On affiche le total dans le HTML en forçant 2 chiffres après la virgule
  totalPrixSpan.textContent = total.toFixed(2);
}
// Cette fonction va se charger de récupérer les données depuis le serveur et de les afficher à l'écran
async function chargerEtAfficherMenu() {
  let platsRecus: Plats[] = [];

  try {
    // lien api
    const reponse = await fetch(
      "http://localhost/pierreburnier/pierre-api-eatsmart/articles"
    );

    if (!reponse.ok) {
      throw new Error(`Erreur de communication : ${reponse.status}`);
    }

    // On stocke les données reçues dans une variable de type Plats[]
    platsRecus = await reponse.json();

    // header avec : titre, message du jour (besoin 3) et nombre de plats reçus du serveur (besoin 1), puis ouverture du conteneur principal
    let htmlAInjecter = `
      <header>
        <h1>EatSmart - Carte du Restaurant</h1>
        <h3> Nombre de plats sur la carte : ${platsRecus.length} </h3>
      </header>
      <main class="content-wrapper">
        <div class="menu-container">
    `;

    // boucle pour créer une carte pour chaque plats reçue du serveur, si le prix est inférieur à 10€ on affiche "Bon plan !" (besoin 2)
    platsRecus.forEach((plat) => {
      htmlAInjecter += `
          <div class="card">
            <h2>${plat.nom}</h2>
            <p>${plat.description}</p>
            <p>Prix : ${plat.prix}€ ${
        plat.prix <= 10 ? "<p class='bon-plan'>Bon plan !</p>" : ""
      }</p>
            <button class="btn-order">Ajouter au panier</button>
          </div>
          `;
    });

    htmlAInjecter += `
        </div>
        <aside class="cart-container">
        <h2>Votre Panier</h2>
        <div id="cart-items">
          <p>Votre panier est vide</p>
        </div>
        <hr>
        <div class="cart-total">
          <strong>Total : <span id="total-prix">0.00</span>€</strong>
        </div>
        </aside>
        `;

    // ferme le conteneur principal
    htmlAInjecter += `
      </main>
    `;

    // affiche le résultat final à l'écran
    appDiv.innerHTML = htmlAInjecter;
  } catch (erreur) {
    console.error("Problème lors du chargement des plats :", erreur);
    // si le serveur plante, on affiche un message à l'utilisateur au lieu d'une page blanche
    appDiv.innerHTML = `<h2>Oups, impossible de charger le menu pour le moment...</h2>`;
  }

  // Récupère TOUS les boutons ayant la classe "btn-order"
  const boutonAjouter =
    document.querySelectorAll<HTMLButtonElement>(".btn-order");
  // Parcourt la liste pour leur ajouter une action
  boutonAjouter.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const platClique = platsRecus[index]; // Récupère le plat correspondant au bouton cliqué grâce à l'index
      console.log(
        `Bouton n°${index} cliqué ! Vous avez ajouté : ${platClique.nom} à votre panier.`
      );
      // ajouter le plat au panier
      panier.push(platClique);
      console.log("Panier actuel :", panier);
      mettreAJourPanier();
    });
  });
}

// lance le processus dès que la page s'ouvre !
chargerEtAfficherMenu();
