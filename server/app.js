import express from "express";
import sequelize from "./src/config/sequelize.js";
import router from "./src/config/router.js"; 
const app = express();

// router
router(app, express);

// Sequelize
try {
	sequelize.authenticate().then(console.log("Connected to postgres"));
} catch (e) {
	console.error(`Error connecting to postgres: ${e}`);
}

export default app;
