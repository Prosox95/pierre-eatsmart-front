import "./style.css";

// On garde notre type bien au chaud pour plus tard
type Pizza = {
    description: string;
    id: number;
    nom: string;
    prix: number;
};

// Nouvelle fonction asynchrone pour aller chercher les plats sur le serveur
async function testerLiaisonAPI() {
    try {
        // lien api
        const reponse = await fetch("TON_URL_API_ICI");

        // vérifie si le serveur a bien répondu (statut 200)
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }

        // transforme la réponse du serveur en données utilisables (JSON)
        const platsReçus = await reponse.json();

        // affichage console pour vérifier que tout est en ordre
        console.log(
            "Connexion établie ! Voici les données du serveur :",
            platsReçus,
        );
    } catch (erreur) {
        console.error("Impossible de joindre le serveur :", erreur);
    }
}

// lance la fonction au chargement de la page
testerLiaisonAPI();
