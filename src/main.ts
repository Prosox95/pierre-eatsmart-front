import "./style.css";

// Définition du type pour les pizzas
type Pizza = {
    description: string;
    id: number;
    nom: string;
    prix: number;
};

// cible la div principale
const appDiv = document.querySelector<HTMLDivElement>("#app")!;

// Cette fonction va se charger de récupérer les données depuis le serveur et de les afficher à l'écran
async function chargerEtAfficherMenu() {
    try {
        // lien api
        const reponse = await fetch(
            "http://localhost/pierreburnier/pierre-api-eatsmart/articles",
        );

        if (!reponse.ok) {
            throw new Error(`Erreur de communication : ${reponse.status}`);
        }

        // On stocke les données reçues dans une variable de type Pizza[]
        const platsRecus: Pizza[] = await reponse.json();

        // injection du HTML de base (header + conteneur principal) dans lequel on va ensuite injecter les cartes de pizzas
        let htmlAInjecter = `
      <header>
        <h1>EatSmart - Carte du Restaurant</h1>
      </header>
      <main class="menu-container">
    `;

        // boucle pour créer une carte pour chaque pizza reçue du serveur
        platsRecus.forEach((pizza) => {
            htmlAInjecter += `
        <div class="card">
          <h3>${pizza.nom}</h3>
          <p>${pizza.description}</p>
          <p><strong>Prix : ${pizza.prix}€</strong></p>
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
}

// lance le processus dès que la page s'ouvre !
chargerEtAfficherMenu();
