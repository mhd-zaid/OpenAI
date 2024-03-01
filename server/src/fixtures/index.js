import connection from '../config/sequelize.js';
// Fixtures
import ingredientFixture from "./ingredient.js";

const loadIngredients = async () => {
    const model = (await import("../models/Ingredient.js")).default(connection)
	try {
		await Promise.all(ingredientFixture.map((ingredient) => model.create(ingredient)));
		console.log("Ingredients loaded");
	} catch (err) {
		console.error(err);
	}
};

const main = async () => {
	try {
		await loadIngredients();
	} catch (error) {
		console.error(error);
	} finally {
		connection.close();
	}
};

main();
