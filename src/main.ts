// Définition du type Pizza
type Pizza = {
    description: string;
    id: number;
    nom: string;
    prix: number;
};

// Création d'un tableau de pizzas avec des données codé en dur
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

// Affichage du menu dans la console
console.log(menu);
