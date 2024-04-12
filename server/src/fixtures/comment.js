import { v4 as uuidv4 } from 'uuid';

const goodRatings = [3.5, 4, 4.5, 5];
const badRatings = [2, 2.5, 3];
// const getRandomRating = () => goodRatings[Math.floor(Math.random() * goodRatings.length)];
// const getRandomRating = () => badRatings[Math.floor(Math.random() * badRatings.length)];

const getRandomRating = () => {
  const min = 4; // minimum rating
  const max = 10; // maximum rating
  // Generate a random number between min and max
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  // Divide by 2 to get a number between 2 and 5 with increments of 0.5
  return random / 2;
};

const commentsFixture = [
  {
    comment: 'Une recette simple mais tellement délicieuse! Je la recommande à tous les amateurs de cuisine rapide et savoureuse.',
    rating: getRandomRating()
  },
  {
    comment: 'Un vrai coup de cœur pour cette recette! Les saveurs se marient à la perfection.',
    rating: getRandomRating()
  },
  {
    comment: 'Une recette qui a réveillé mes papilles endormies. Je suis impressionné par la richesse des saveurs.',
    rating: getRandomRating()
  },
  {
    comment: 'Merci pour cette recette qui a fait l\'unanimité à table! Je suis conquis.',
    rating: getRandomRating()
  },
  {
    comment: 'Une recette qui m\'a permis de cuisiner des ingrédients que je n\'aurais jamais osé associer. Le résultat est bluffant!',
    rating: getRandomRating()
  },
  {
    comment: 'Je suis épaté par la simplicité et la finesse de cette recette. À essayer absolument!',
    rating: getRandomRating()
  },
  {
    comment: 'Un véritable délice pour les papilles! Cette recette est un must-have dans toutes les cuisines.',
    rating: getRandomRating()
  },
  {
    comment: 'Je suis fan de cette recette depuis la première bouchée! Merci pour ce moment de bonheur gustatif.',
    rating: getRandomRating()
  },
  {
    comment: 'Une recette qui a su séduire même les palais les plus exigeants. Bravo!',
    rating: getRandomRating()
  },
  {
    comment: 'Cette recette a été un vrai succès lors de mon dernier dîner entre amis. Je la recommande vivement!',
    rating: getRandomRating()
  },
  {
    comment: 'Je suis bluffé par le résultat! Cette recette est désormais un incontournable chez moi.',
    rating: getRandomRating()
  },
  {
    comment: 'Merci pour cette recette qui m\'a permis de découvrir de nouveaux horizons culinaires.',
    rating: getRandomRating()
  },
  {
    comment: 'Un véritable régal pour les sens! Je suis impressionné par la qualité des ingrédients utilisés.',
    rating: getRandomRating()
  },
  {
    comment: 'J\'ai été agréablement surpris par la facilité de réalisation de cette recette. Le résultat est bluffant!',
    rating: getRandomRating()
  },
  {
    comment: 'Un vrai délice pour toute la famille! Cette recette est maintenant un classique chez nous.',
    rating: getRandomRating()
  },
  {
    comment: 'Cette recette est un véritable concentré de bonheur en bouche! Je la recommande à tous.',
    rating: getRandomRating()
  },
  {
    comment: 'Merci pour cette recette qui a rendu mon repas extraordinaire. Je suis comblé!',
    rating: getRandomRating()
  },
  {
    comment: 'Une recette simple mais tellement savoureuse! Mes papilles vous remercient.',
    rating: getRandomRating()
  },
  {
    comment: 'Un vrai régal pour les yeux et le palais! Je suis fan de cette recette.',
    rating: getRandomRating()
  },
  {
    comment: 'Cette recette a été un succès total lors de mon dernier dîner. Mes invités en redemandent!',
    rating: getRandomRating()
  },
  {
    comment: 'Une recette qui m\'a permis de briller en cuisine! Merci pour cette trouvaille.',
  rating: getRandomRating()
},
{
  comment: 'Un mélange de saveurs surprenant et délicieux! Je suis conquis par cette recette.',
      rating: getRandomRating()
},
{
  comment: 'Une recette simple à réaliser et délicieuse à déguster! Merci pour cette trouvaille.',
      rating: getRandomRating()
},
{
  comment: 'Un vrai coup de cœur pour cette recette qui a su ravir toute ma famille. À refaire sans hésiter!',
      rating: getRandomRating()
},
{
  comment: 'Cette recette est un vrai délice pour les papilles! Merci pour cette découverte culinaire.',
      rating: getRandomRating()
},
{
  comment: 'Un véritable plaisir pour les sens! Je recommande chaudement cette recette.',
      rating: getRandomRating()
},
{
  comment: 'Cette recette m\'a permis de régaler toute ma famille. Je suis ravi du résultat!',
  rating: getRandomRating()
},
{
  comment: 'Un vrai délice du début à la fin! Cette recette est un incontournable chez moi.',
      rating: getRandomRating()
},
{
  comment: 'Merci pour cette recette qui a su enchanter nos papilles. Un vrai régal!',
      rating: getRandomRating()
},
{
  comment: 'Une recette simple mais tellement savoureuse! Je suis fan.',
      rating: getRandomRating()
},
{
  comment: 'Cette recette a été un vrai succès lors de mon dernier dîner entre amis. Tout le monde a adoré!',
      rating: getRandomRating()
},
{
  comment: 'Un véritable coup de cœur pour cette recette qui a su séduire toute ma famille. Bravo!',
      rating: getRandomRating()
},
{
  comment: 'Je suis impressionné par la simplicité de cette recette et la richesse des saveurs. À essayer absolument!',
      rating: getRandomRating()
},
{
  comment: 'Une recette qui a su combler toutes mes attentes! Je suis conquis.',
      rating: getRandomRating()
},
{
  comment: 'Un vrai régal pour les papilles! Je recommande chaudement cette recette à tous les amateurs de bonne cuisine.',
      rating: getRandomRating()
},
{
  comment: 'Merci pour cette recette qui a rendu mon repas extraordinaire. Je suis impressionné par le résultat!',
      rating: getRandomRating()
},
{
  comment: 'Une recette simple à réaliser mais tellement savoureuse! Mes convives en ont redemandé.',
      rating: getRandomRating()
},
{
  comment: 'Un véritable régal pour les sens! Je suis fan de cette recette qui a su conquérir mon cœur.',
      rating: getRandomRating()
},
{
  comment: 'Cette recette est une véritable réussite! Je suis conquis par le résultat.',
      rating: getRandomRating()
},
{
  comment: 'Merci pour cette recette qui a régalé toute ma famille. Je suis ravi du résultat!',
      rating: getRandomRating()
},
  {
    comment: 'Pas convaincu par cette recette. Les saveurs ne se marient pas bien ensemble.',
    rating: getRandomRating()
  },
  {
    comment: 'Cette recette était correcte, mais je m\'attendais à mieux. Peut-être que je la referai avec quelques ajustements.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était un peu fade à mon goût. Peut-être qu\'en ajoutant plus d\'épices cela aurait été meilleur.',
    rating: getRandomRating()
  },
  {
    comment: 'J\'ai trouvé cette recette un peu trop compliquée à suivre. Les instructions étaient confuses.',
    rating: getRandomRating()
  },
  {
    comment: 'La présentation était bonne mais le goût était décevant. Je ne pense pas refaire cette recette.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne suis pas sûr d\'avoir aimé cette recette. Les ingrédients ne semblaient pas bien équilibrés.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais pas mémorable. Je chercherai d\'autres options à l\'avenir.',
    rating: getRandomRating()
  },
  {
    comment: 'Je m\'attendais à plus de saveur. Cette recette était un peu fade pour moi.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais elle manquait de quelque chose pour la rendre vraiment délicieuse.',
    rating: getRandomRating()
  },
  {
    comment: 'Je n\ai pas été impressionné par cette recette. Il y avait quelque chose qui n\'allait pas avec les proportions des ingrédients.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne pense pas que je referai cette recette. Il y avait un arrière-goût étrange que je n\'ai pas apprécié.',
    rating: getRandomRating()
  },
  {
    comment: 'Cette recette était un peu trop grasse à mon goût. Je préfère les plats plus légers.',
    rating: getRandomRating()
  },
  {
    comment: 'Pas fan de cette recette. Je pense qu\'elle aurait pu être améliorée avec quelques ajustements.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais elle n\'a pas vraiment suscité d\'enthousiasme chez moi.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne suis pas sûr d\'avoir aimé cette recette. Peut-être qu\'elle ne correspond tout simplement pas à mes goûts.',
    rating: getRandomRating()
  },
  {
    comment: 'La texture de cette recette n\'était pas à mon goût. C\'était un peu trop mou pour moi.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais je ne l\'ai pas trouvée exceptionnelle. Je chercherai d\'autres alternatives à l\'avenir.',
    rating: getRandomRating()
  },
  {
    comment: 'Pas convaincu par cette recette. Il y avait quelque chose qui n\'allait pas avec les proportions des ingrédients.',
    rating: getRandomRating()
  },
  {
    comment: 'Cette recette était correcte mais elle manquait de saveur à mon goût.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était un peu fade pour moi. Je pense qu\'elle aurait pu être plus savoureuse avec quelques ajustements.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne suis pas sûr d\'avoir aimé cette recette. Les saveurs ne semblaient pas bien équilibrées.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais elle manquait de quelque chose pour la rendre vraiment délicieuse.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne pense pas que je referai cette recette. Il y avait quelque chose qui n\'allait pas avec la texture.',
    rating: getRandomRating()
  },
  {
    comment: 'Pas fan de cette recette. Je pense qu\'elle aurait pu être meilleure avec quelques ajustements.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais elle n\'a pas vraiment suscité d\'enthousiasme chez moi.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne suis pas sûr d\'avoir aimé cette recette. Peut-être qu\'elle ne correspond tout simplement pas à mes goûts.',
    rating: getRandomRating()
  },
  {
    comment: 'La texture de cette recette n\'était pas à mon goût. C\'était un peu trop mou pour moi.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais je ne l\'ai pas trouvée exceptionnelle. Je chercherai d\'autres alternatives à l\'avenir.',
    rating: getRandomRating()
  },
  {
    comment: 'Pas convaincu par cette recette. Il y avait quelque chose qui n\'allait pas avec les proportions des ingrédients.',
    rating: getRandomRating()
  },
  {
    comment: 'Cette recette était correcte mais elle manquait de saveur à mon goût.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était un peu fade pour moi. Je pense qu\'elle aurait pu être plus savoureuse avec quelques ajustements.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne suis pas sûr d\'avoir aimé cette recette. Les saveurs ne semblaient pas bien équilibrées.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais elle manquait de quelque chose pour la rendre vraiment délicieuse.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne pense pas que je referai cette recette. Il y avait quelque chose qui n\'allait pas avec la texture.',
    rating: getRandomRating()
  },
  {
    comment: 'Pas fan de cette recette. Je pense qu\'elle aurait pu être meilleure avec quelques ajustements.',
    rating: getRandomRating()
  },
  {
    comment: 'La recette était correcte mais elle n\'a pas vraiment suscité d\'enthousiasme chez moi.',
    rating: getRandomRating()
  },
  {
    comment: 'Je ne suis pas sûr d\'avoir aimé cette recette. Peut-être qu\'elle ne correspond tout simplement pas à mes goûts.',
    rating: getRandomRating()
  },
  {
    comment: 'La texture de cette recette n\'était pas à mon goût. C\'était un peu trop mou pour moi.',
    rating: getRandomRating()
  }
]


export default commentsFixture;