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

    // injection du HTML de base (header + conteneur principal) dans lequel on va ensuite injecter les cartes de plats
    let htmlAInjecter = `
      <header>
        <h1>EatSmart - Carte du Restaurant</h1>
      </header>
      <main class="menu-container">
    `;

    // boucle pour créer une carte pour chaque plats reçue du serveur
    platsRecus.forEach((plats) => {
      htmlAInjecter += `
        <div class="card">
          <h3>${plats.nom}</h3>
          <p>${plats.description}</p>
          <p><strong>Prix : ${plats.prix}€</strong></p>
          <button class="btn-order">Ajouter</button>
        </div>
      `;
    });

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
      // Ajoute le plat correspondant au panier
      panier.push(platClique);
      console.log("Contenu actuel du panier :", panier);
    });
  });
}

// lance le processus dès que la page s'ouvre !
chargerEtAfficherMenu();
