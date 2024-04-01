const goodRatings = [3.5, 4, 4.5, 5];
const badRatings = [0.5, 1, 1.5, 2, 2.5, 3];
const getRandomGoodRating = () => goodRatings[Math.floor(Math.random() * goodRatings.length)];
const getRandomBadRating = () => badRatings[Math.floor(Math.random() * badRatings.length)];

const preferencesFixture = [
  {
    isLiked: true,
    isAllergic: false,
    User: "MakanKAMISSOKO",
    Ingredient: "Tomate"
  },

]


export default preferencesFixture;