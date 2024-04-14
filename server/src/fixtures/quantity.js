const quantitiesFixture = [
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Muscade',
    Recipe: 'Soufflé au fromage',
  },
  {
    quantity: 60,
    unit: 'g',
    Ingredient: 'Farine',
    Recipe: 'Soufflé au fromage',
  },
  {
    quantity: 60,
    unit: 'g',
    Ingredient: 'Beurre',
    Recipe: 'Soufflé au fromage',
  },
  {
    quantity: 150,
    unit: 'g',
    Ingredient: 'Fromage râpé',
    Recipe: 'Soufflé au fromage',
  },
  {
    quantity: 4,
    unit: null,
    Ingredient: 'Oeuf',
    Recipe: 'Soufflé au fromage',
  },
  {
    quantity: 40,
    unit: 'cl',
    Ingredient: 'Lait',
    Recipe: 'Soufflé au fromage',
  },
  {
    quantity: 150,
    unit: 'ml',
    Ingredient: 'Huile',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 3,
    unit: 'cuillères à soupe',
    Ingredient: "Huile d'olive",
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 1,
    unit: 'cuillères à café',
    Ingredient: 'Gingembre en poudre',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 1,
    unit: 'cuillères à café',
    Ingredient: 'Curry',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Oignon',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Carotte',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 5,
    unit: null,
    Ingredient: 'Feuille de brick',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 250,
    unit: 'g',
    Ingredient: 'Boeuf haché',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 1,
    unit: 'gousse',
    Ingredient: 'Ail',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Oeuf',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 5,
    unit: 'cuillères à soupe',
    Ingredient: 'Soja',
    Recipe: 'Samoussa au boeuf',
  },
  {
    quantity: 125,
    unit: 'g',
    Ingredient: 'Beurre',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 100,
    unit: 'g',
    Ingredient: 'Farine',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Poivre',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Sel',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 70,
    unit: 'g',
    Ingredient: 'Fromage râpé',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 3,
    unit: 'pincées',
    Ingredient: 'Beurre',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Thym',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: 'Feuilles de laurier',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 20,
    unit: 'cl',
    Ingredient: 'Vin rouge',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 800,
    unit: 'g',
    Ingredient: 'Purée de tomate',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Carotte',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 3,
    unit: null,
    Ingredient: 'Oignon',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: 'paquet',
    Ingredient: 'Lasagne',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 2,
    unit: 'gousses',
    Ingredient: 'Ail',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: 'branche',
    Ingredient: 'Céleri',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 600,
    unit: 'g',
    Ingredient: 'Boeuf haché',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 15,
    unit: 'cl',
    Ingredient: 'Eau',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Basilic',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 125,
    unit: 'g',
    Ingredient: 'Parmesan',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 1,
    unit: 'L',
    Ingredient: 'Lait',
    Recipe: 'Lasagnes à la bolognaise',
  },
  {
    quantity: 4,
    unit: 'g',
    Ingredient: 'Beurre',
    Recipe: 'Pâte à crêpes',
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: 'Huile',
    Recipe: 'Pâte à crêpes',
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: 'Sucre',
    Recipe: 'Pâte à crêpes',
  },
  {
    quantity: 20,
    unit: 'g',
    Ingredient: 'Farine',
    Recipe: 'Pâte à crêpes',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Oeuf',
    Recipe: 'Pâte à crêpes',
  },
  {
    quantity: 4,
    unit: 'cl',
    Ingredient: 'Lait',
    Recipe: 'Pâte à crêpes',
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: 'Eau de fleur d’oranger',
    Recipe: 'Bissap',
  },
  {
    quantity: 1,
    unit: 'pincée',
    Ingredient: 'Muscade',
    Recipe: 'Bissap',
  },
  {
    quantity: 100,
    unit: 'g',
    Ingredient: 'Sucre',
    Recipe: 'Bissap',
  },
  {
    quantity: 2,
    unit: 'L',
    Ingredient: 'Eau',
    Recipe: 'Bissap',
  },
  {
    quantity: 2,
    unit: 'tasses',
    Ingredient: 'Bissap',
    Recipe: 'Bissap',
  },
  {
    quantity: 2,
    unit: 'sachet',
    Ingredient: 'Sucre vanillé',
    Recipe: 'Bissap',
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: 'Rhum',
    Recipe: 'Mojito',
  },
  {
    quantity: 3,
    unit: 'cuillères à café',
    Ingredient: 'Sucre de canne',
    Recipe: 'Mojito',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Citron vert',
    Recipe: 'Mojito',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Banane',
    Recipe: 'Smoothie banane',
  },
  {
    quantity: 50,
    unit: 'cl',
    Ingredient: 'Lait',
    Recipe: 'Smoothie banane',
  },
  {
    quantity: 3,
    unit: null,
    Ingredient: 'Fraise',
    Recipe: 'Smoothie fraise',
  },
  {
    quantity: 50,
    unit: 'cl',
    Ingredient: 'Lait',
    Recipe: 'Smoothie fraise',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Poivre',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Sel',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Fromage râpé',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: 'Farine',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: 'Huile',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 50,
    unit: 'g',
    Ingredient: 'Beurre',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 4,
    unit: null,
    Ingredient: 'Oignon',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 1,
    unit: 'L',
    Ingredient: 'Eau',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 6,
    unit: null,
    Ingredient: 'Pain de mie',
    Recipe: "Soupe à l'oignon",
  },
  {
    quantity: 100,
    unit: 'g',
    Ingredient: 'Sucre',
    Recipe: 'Gâteau au chocolat fondant',
  },
  {
    quantity: 50,
    unit: 'g',
    Ingredient: 'Farine',
    Recipe: 'Gâteau au chocolat fondant',
  },
  {
    quantity: 100,
    unit: 'g',
    Ingredient: 'Beurre',
    Recipe: 'Gâteau au chocolat fondant',
  },
  {
    quantity: 3,
    unit: null,
    Ingredient: 'Oeuf',
    Recipe: 'Gâteau au chocolat fondant',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Tablette de chocolat',
    Recipe: 'Gâteau au chocolat fondant',
  },
  {
    quantity: 12,
    unit: 'grosses',
    Ingredient: 'Noix de Saint-Jacques',
    Recipe: 'Saint-Jacques marinées au citron',
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: 'Citron',
    Recipe: 'Saint-Jacques marinées au citron',
  },
  {
    quantity: 4,
    unit: 'cuillères à soupe',
    Ingredient: "Huile d'olive",
    Recipe: 'Saint-Jacques marinées au citron',
  },
  {
    quantity: 1,
    unit: 'botte',
    Ingredient: 'Ciboullette',
    Recipe: 'Saint-Jacques marinées au citron',
  },
  {
    quantity: 3,
    unit: null,
    Ingredient: 'Ciboule',
    Recipe: 'Saint-Jacques marinées au citron',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Sel',
    Recipe: 'Saint-Jacques marinées au citron',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Poivre',
    Recipe: 'Saint-Jacques marinées au citron',
  },
  {
    quantity: 10,
    unit: 'g',
    Ingredient: 'Beurre',
    Recipe: 'Dêguê',
  },
  {
    quantity: 50,
    unit: 'g',
    Ingredient: 'Sucre',
    Recipe: 'Dêguê',
  },
  {
    quantity: 100,
    unit: 'g',
    Ingredient: 'Semoule de mil précuite',
    Recipe: 'Dêguê',
  },
  {
    quantity: 1,
    unit: 'L',
    Ingredient: 'Lait fermenté',
    Recipe: 'Dêguê',
  },
  {
    quantity: 4,
    unit: 'cuisse',
    Ingredient: 'Poulet',
    Recipe: 'Tajine',
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: 'Poulet',
    Recipe: 'Tajine',
  },
  {
    quantity: 2,
    unit: 'cuullères à soupe',
    Ingredient: 'Curry',
    Recipe: 'Tajine',
  },
  {
    quantity: 4,
    unit: 'cuillères à soupe',
    Ingredient: 'Jus de citron',
    Recipe: 'Tajine',
  },
  {
    quantity: 30,
    unit: null,
    Ingredient: 'Olives vertes',
    Recipe: 'Tajine',
  },
  {
    quantity: 4,
    unit: 'cuillères à soupe',
    Ingredient: "Huile d'olive",
    Recipe: 'Tajine',
  },
  {
    quantity: 3,
    unit: 'goutte',
    Ingredient: 'Vanille',
    Recipe: 'Milk shake à la vanille',
  },
  {
    quantity: 1,
    unit: 'L',
    Ingredient: 'Glace à la vanille',
    Recipe: 'Milk shake à la vanille',
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: 'Crème chantilly',
    Recipe: 'Milk shake à la vanille',
  },
  {
    quantity: 50,
    unit: 'cl',
    Ingredient: 'Lait',
    Recipe: 'Milk shake à la vanille',
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: "Oeuf",
    Recipe: "Omelette aux tomates et au fromage",
  },
  {
    quantity: 50,
    unit: 'g',
    Ingredient: "Fromage",
    Recipe: "Omelette aux tomates et au fromage",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Tomate",
    Recipe: "Omelette aux tomates et au fromage",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Oignon",
    Recipe: "Omelette aux oignons et herbes de Provence",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Herbes de Provence",
    Recipe: "Omelette aux oignons et herbes de Provence",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Tablette de chocolat",
    Recipe: "Bûche aux fruits exotiques et chocolat noisettes Nestlé Dessert",
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: "Fruit de la passion",
    Recipe: "Bûche aux fruits exotiques et chocolat noisettes Nestlé Dessert",
  },
  {
    quantity: 100,
    unit: 'g',
    Ingredient: "Sel",
    Recipe: "Tarte tatin aux pommes et caramel beurre salé",
  },
  {
    quantity: 200,
    unit: 'g',
    Ingredient: "Farine",
    Recipe: "Tarte tatin aux pommes et caramel beurre salé",
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: "Pomme",
    Recipe: "Tarte tatin aux pommes et caramel beurre salé",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Poulet",
    Recipe: "Poulet rôti aux herbes de Provence",
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: "Herbes de Provence",
    Recipe: "Poulet rôti aux herbes de Provence",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Pâte",
    Recipe: "Pâtes à la carbonara",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Lardon",
    Recipe: "Pâtes à la carbonara",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Crème fraîche",
    Recipe: "Pâtes à la carbonara",
  },
  {
    quantity: 2,
    unit: null,
    Ingredient: "Gousse d'ail",
    Recipe: "Pâtes à la carbonara",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Oignon",
    Recipe: "Pâtes à la carbonara",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Herbes de Provence",
    Recipe: "Pâtes à la carbonara",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Beurre",
    Recipe: "Tarte tatin aux pommes et caramel beurre salé",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Sucre",
    Recipe: "Tarte tatin aux pommes et caramel beurre salé",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Caramel",
    Recipe: "Tarte tatin aux pommes et caramel beurre salé",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Herbes de Provence",
    Recipe: "Poulet rôti aux herbes de Provence",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Huile d'olive",
    Recipe: "Poulet rôti aux herbes de Provence",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Pâte brisée",
    Recipe: "Tarte aux pommes maison",
  },
  {
    quantity: 4,
    unit: null,
    Ingredient: "Pommes",
    Recipe: "Tarte aux pommes maison",
  },
  {
    quantity: 100,
    unit: 'g',
    Ingredient: "Sucre",
    Recipe: "Tarte aux pommes maison",
  },
  {
    quantity: 1,
    unit: 'c. à soupe',
    Ingredient: "Cannelle",
    Recipe: "Tarte aux pommes maison",
  },
  {
    quantity: 1,
    unit: 'c. à soupe',
    Ingredient: "Farine",
    Recipe: "Tarte aux pommes maison",
  },
  {
    quantity: 50,
    unit: 'g',
    Ingredient: "Beurre",
    Recipe: "Tarte aux pommes maison",
  },
  {
    quantity: 4,
    unit: 'filets',
    Ingredient: "Saumon",
    Recipe: "Saumon grillé à la sauce teriyaki",
  },
  {
    quantity: 0.5,
    unit: 'tasse',
    Ingredient: "Sauce teriyaki",
    Recipe: "Saumon grillé à la sauce teriyaki",
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: "Miel",
    Recipe: "Saumon grillé à la sauce teriyaki",
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: "Vinaigre de riz",
    Recipe: "Saumon grillé à la sauce teriyaki",
  },
  {
    quantity: 300,
    unit: 'g',
    Ingredient: "Champignons sauvages",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 1,
    unit: 'L',
    Ingredient: "Bouillon de légumes",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: "Beurre",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 1,
    unit: 'oignon',
    Ingredient: "Oignon",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 300,
    unit: 'g',
    Ingredient: "Riz arborio",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 50,
    unit: 'g',
    Ingredient: "Parmesan râpé",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: "Persil frais",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 300,
    unit: 'g',
    Ingredient: "Champignons sauvages",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 1,
    unit: 'L',
    Ingredient: "Bouillon de légumes",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: "Beurre",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 1,
    unit: 'oignon',
    Ingredient: "Oignon",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 300,
    unit: 'g',
    Ingredient: "Riz arborio",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 50,
    unit: 'g',
    Ingredient: "Parmesan râpé",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: "Persil frais",
    Recipe: "Risotto aux champignons sauvages",
  },
  {
    quantity: 4,
    unit: 'cuisses',
    Ingredient: "Poulet",
    Recipe: "Poulet au miel et à l'ail rôti",
  },
  {
    quantity: 4,
    unit: 'cuillères à soupe',
    Ingredient: "Miel",
    Recipe: "Poulet au miel et à l'ail rôti",
  },
  {
    quantity: 4,
    unit: 'gousses',
    Ingredient: "Gousse d'ail",
    Recipe: "Poulet au miel et à l'ail rôti",
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: "Huile d'olive",
    Recipe: "Poulet au miel et à l'ail rôti",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Sel",
    Recipe: "Poulet au miel et à l'ail rôti",
  },
  {
    quantity: null,
    unit: null,
    Ingredient: "Poivre",
    Recipe: "Poulet au miel et à l'ail rôti",
  },
  {
    quantity: 1,
    unit: 'tasse',
    Ingredient: "Quinoa",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Courgette",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Poivron",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Aubergine",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Tomate cerise",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 1,
    unit: null,
    Ingredient: "Oignon rouge",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 2,
    unit: 'cuillères à soupe',
    Ingredient: "Huile d'olive",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: "Vinaigre de cidre",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    quantity: 1,
    unit: 'cuillère à soupe',
    Ingredient: "Jus de citron",
    Recipe: "Salade de quinoa aux légumes grillés",
  },
  {
    Ingredient: "Riz à sushi",
    quantity: 2,
    unit: "tasses",
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Feuilles d'algue nori",
    quantity: 6,
    unit: null,
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Saumon frais",
    quantity: 200,
    unit: "g",
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Avocat",
    quantity: 1,
    unit: null,
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Concombre",
    quantity: 1,
    unit: null,
    Recipe: "Makis au saumon",
  },
  {
    unit: null,
    Ingredient: "Wasabi",
    quantity: null,
    Recipe: "Makis au saumon",
  },
  {
    unit: null,
    Ingredient: "Sauce soja",
    quantity: null,
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Vinaigre de riz",
    quantity: 2,
    unit: "cuillères à soupe",
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Sucre",
    quantity: 1,
    unit: "cuillère à café",
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Sel",
    quantity: null,
    unit: null,
    Recipe: "Makis au saumon",
  },
  {
    Ingredient: "Mûres fraîches",
    quantity: 500,
    unit: "g",
    Recipe: "Sirop de mûres",
  },
  {
    Ingredient: "Eau",
    quantity: 250,
    unit: "ml",
    Recipe: "Sirop de mûres",
  },
  {
    Ingredient: "Sucre",
    quantity: 250,
    unit: "g",
    Recipe: "Sirop de mûres",
  },
  {
    Ingredient: "Jus de citron",
    quantity: 1,
    unit: null,
    Recipe: "Sirop de mûres",
  },
  {
    Ingredient: "Épinards frais",
    quantity: 100,
    unit: "g",
    Recipe: "Smoothie exotique aux épinards",
  },
  {
    Ingredient: "Ananas frais",
    quantity: 150,
    unit: "g",
    Recipe: "Smoothie exotique aux épinards",
  },
  {
    Ingredient: "Banane",
    quantity: 1,
    unit: "",
    Recipe: "Smoothie exotique aux épinards",
  },
  {
    Ingredient: "Jus de citron",
    quantity: 1,
    unit: null,
    Recipe: "Smoothie exotique aux épinards",
  },
  {
    Ingredient: "Lait de coco",
    quantity: 150,
    unit: "ml",
    Recipe: "Smoothie exotique aux épinards",
  },
  {
    Ingredient: "Miel",
    quantity: 1,
    unit: "cuillère à soupe",
    Recipe: "Smoothie exotique aux épinards",
  },
  {
    Ingredient: "Jus de fruit de la passion",
    quantity: 100,
    unit: "ml",
    Recipe: "Mocktail passion",
  },
  {
    Ingredient: "Jus d'orange",
    quantity: 100,
    unit: "ml",
    Recipe: "Mocktail passion",
  },
  {
    Ingredient: "Sirop de grenadine",
    quantity: 20,
    unit: "ml",
    Recipe: "Mocktail passion",
  },
  {
    Ingredient: "Eau gazeuse",
    quantity: 100,
    unit: "ml",
    Recipe: "Mocktail passion",
  },
  {
    Ingredient: "Glaçons",
    quantity: 3,
    unit: null,
    Recipe: "Mocktail passion",
  },
  {
    Ingredient: "Gin",
    quantity: 50,
    unit: "ml",
    Recipe: "Gin tonic",
  },
  {
    Ingredient: "Eau tonique",
    quantity: 150,
    unit: "ml",
    Recipe: "Gin tonic",
  },
  {
    Ingredient: "Glaçons",
    quantity: 3,
    unit: null,
    Recipe: "Gin tonic",
  },
  {
    Ingredient: "Tranches de citron",
    quantity: 1,
    unit: null,
    Recipe: "Gin tonic",
  },
  {
    Ingredient: "Farine",
    quantity: 250,
    unit: "g",
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Sucre",
    quantity: 50,
    unit: "g",
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Oeufs",
    quantity: 2,
    unit: null,
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Lait",
    quantity: 250,
    unit: "ml",
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Beurre fondu",
    quantity: 60,
    unit: "g",
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Levure chimique",
    quantity: 1,
    unit: "cuillère à café",
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Sel",
    quantity: 1,
    unit: "pincée",
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Extrait de vanille",
    quantity: 1,
    unit: "cuillère à café",
    Recipe: "Gaufre au sucre",
  },
  {
    Ingredient: "Eau",
    quantity: 125,
    unit: "ml",
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Beurre",
    quantity: 100,
    unit: "g",
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Farine",
    quantity: 125,
    unit: "g",
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Oeufs",
    quantity: 4,
    unit: null,
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Sucre",
    quantity: 25,
    unit: "g",
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Crème pâtissière",
    quantity: "selon besoin",
    unit: null,
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Crème chantilly",
    quantity: "selon besoin",
    unit: null,
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Amandes effilées",
    quantity: "au goût",
    unit: null,
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Sucre glace",
    quantity: "pour saupoudrer",
    unit: null,
    Recipe: "Paris-Brest",
  },
  {
    Ingredient: "Farine",
    quantity: 250,
    unit: "g",
    Recipe: "Cookies",
  },
  {
    Ingredient: "Beurre",
    quantity: 150,
    unit: "g",
    Recipe: "Cookies",
  },
  {
    Ingredient: "Sucre",
    quantity: 150,
    unit: "g",
    Recipe: "Cookies",
  },
  {
    Ingredient: "Oeuf",
    quantity: 1,
    unit: null,
    Recipe: "Cookies",
  },
  {
    Ingredient: "Extrait de vanille",
    quantity: 1,
    unit: "cuillère à café",
    Recipe: "Cookies",
  },
  {
    Ingredient: "Bicarbonate de soude",
    quantity: 1,
    unit: "cuillère à café",
    Recipe: "Cookies",
  },
  {
    Ingredient: "Sel",
    quantity: 1,
    unit: "pincée",
    Recipe: "Cookies",
  },
  {
    Ingredient: "Pépites de chocolat",
    quantity: 200,
    unit: "g",
    Recipe: "Cookies",
  },
  {
    Ingredient: "Biscuits (type sablés)",
    quantity: 200,
    unit: "g",
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Beurre fondu",
    quantity: 100,
    unit: "g",
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Fromage frais (type Philadelphia)",
    quantity: 500,
    unit: "g",
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Sucre",
    quantity: 150,
    unit: "g",
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Oeufs",
    quantity: 3,
    unit: null,
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Extrait de vanille",
    quantity: 1,
    unit: "cuillère à café",
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Crème fraîche épaisse",
    quantity: 200,
    unit: "g",
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Jus de citron",
    quantity: 1,
    unit: null,
    Recipe: "Cheesecake",
  },
  {
    Ingredient: "Nouilles de riz",
    quantity: 200,
    unit: "g",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Huile de sésame",
    quantity: 2,
    unit: "cuillères à soupe",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Crevettes",
    quantity: 200,
    unit: "g",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Poulet (ou tofu pour une version végétarienne)",
    quantity: 200,
    unit: "g",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Oeufs",
    quantity: 2,
    unit: null,
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Oignon",
    quantity: 1,
    unit: null,
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Ail",
    quantity: 2,
    unit: "gousses",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Pousse de soja",
    quantity: 100,
    unit: "g",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Cacahuètes grillées non salées",
    quantity: 50,
    unit: "g",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Sauce soja",
    quantity: 3,
    unit: "cuillères à soupe",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Sucre de canne",
    quantity: 1,
    unit: "cuillère à café",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Jus de citron vert",
    quantity: 1,
    unit: null,
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Ciboulette",
    quantity: 2,
    unit: "cuillères à soupe",
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Piment rouge (optionnel pour une version épicée)",
    quantity: "au goût",
    unit: null,
    Recipe: "Pad Thai",
  },
  {
    Ingredient: "Taro",
    quantity: 2,
    unit: "kg",
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Tripes de boeuf",
    quantity: 1,
    unit: "kg",
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Huile de palme",
    quantity: 190,
    unit: "g",
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Sel gemme",
    quantity: 16,
    unit: "g",
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Condiments pour sauce jaune",
    quantity: 1,
    unit: "sachet",
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Eau tiède",
    quantity: 1,
    unit: "L",
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Sel",
    quantity: null,
    unit: null,
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Cubes Maggi",
    quantity: 4,
    unit: null,
    Recipe: "Taro sauce jaune",
  },
  {
    Ingredient: "Piment",
    quantity: 1,
    unit: null,
    Recipe: "Taro sauce jaune",
  }
]

export default quantitiesFixture;
